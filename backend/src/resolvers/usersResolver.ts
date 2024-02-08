import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
import { GraphQLError } from 'graphql'
// import { validate } from 'class-validator'
import {
    User,
    // NewUserInput,
    UserWithoutPassword,
    InputRegister,
    InputLogin,
    Message,
    UserInfos,
} from '../entities/user'
import * as argon2 from 'argon2'
import { SignJWT } from 'jose'
import { MyContext } from '..'
import Cookies from 'cookies'

export async function findUserByEmail(email: string) {
    return await User.findOneBy({ email })
}

async function createUser({ pseudo, email, password }: InputRegister) {
    return await User.create({ pseudo, email, password }).save()
}

@Resolver(User)
class UsersResolver {
    @Query(() => [User])
    async users() {
        return User.find()
    }

    @Mutation(() => UserWithoutPassword)
    async register(@Arg('data') data: InputRegister) {
        const { pseudo, email, password } = data
        const user = await findUserByEmail(email)

        if (user) {
            throw new GraphQLError(
                `User already exist, fait pas trop le malin ${pseudo}`,
            )
        }
        const newUser = await createUser({ pseudo, email, password })
        return newUser
    }

    @Query(() => Message)
    async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
        const user = await findUserByEmail(infos.email)

        if (!user) {
            throw new GraphQLError(`User doesn't exist`)
        }

        const isPasswordValid = await argon2.verify(
            user.password,
            infos.password,
        )
        const responseMessage = new Message()
        if (isPasswordValid) {
            const token = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('token', token, { httpOnly: true })

            responseMessage.message = 'Bienvenue!'
            responseMessage.success = true
        } else {
            responseMessage.message = 'Vérifiez vos informations'
            responseMessage.success = false
        }

        return responseMessage
    }

    @Authorized()
    @Query(() => Message)
    async testAuthorized() {
        const responseMessage = new Message()
        responseMessage.message = 'Tu es arrive a cette query'
        responseMessage.success = true
        return responseMessage
    }

    @Query(() => UserInfos)
    async getUserInfos(@Ctx() ctx: MyContext) {
        if (!ctx.user) {
            throw new GraphQLError("No JWT, t'es crazy (gift)")
        }
        const userData = await User.findOneBy({ email: ctx.user.email })

        if (!userData) throw new GraphQLError('Cannot find user')

        return {
            id: userData.id,
            pseudo: userData.pseudo,
            email: userData.email,
        }
    }

    @Query(() => Message)
    async logout(@Ctx() ctx: MyContext) {
        if (ctx.user) {
            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('token')
        }
        const responseMessage = new Message()

        responseMessage.message = 'Vous avez été déconnecté'
        responseMessage.success = true

        return responseMessage
    }
}

export default UsersResolver

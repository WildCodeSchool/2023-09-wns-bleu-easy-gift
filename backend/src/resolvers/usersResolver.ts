import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
import { GraphQLError } from 'graphql'
import {
    User,
    UserWithoutPassword,
    UserWithoutPasswordAvatar,
    InputRegister,
    InputLogin,
    ResponseMessage,
    UserInfos,
    InputRegistrationWithToken,
    InputUpdateUser,
    InputUpdateAvatar,
} from '../entities/user'
import * as argon2 from 'argon2'
import { SignJWT } from 'jose'
import { MyContext } from '..'
import Cookies from 'cookies'
import { Avatar } from '../entities/avatar'
import crypto from 'crypto'

export async function findUserByEmail(email: string) {
    return await User.findOne({
        where: { email },
        relations: ['avatar', 'userToGroups.user', 'userToGroups.group'],
    })
}

export async function createUser({
    pseudo,
    email,
    password,
    avatar,
}: InputRegister) {
    const profilAvatars = await Avatar.find({ where: { type: 'profil' } })
    const randomProfilAvatar =
        profilAvatars[Math.floor(Math.random() * profilAvatars.length)]

    const token = crypto.randomBytes(32).toString('hex')

    const newUser = await User.create({
        pseudo: pseudo !== undefined ? pseudo : email.split('@')[0],
        email,
        password,

        token: token,
        avatar: avatar !== undefined ? avatar : randomProfilAvatar,
    }).save()

    return newUser
}

@Resolver(User)
class UsersResolver {
    @Query(() => [User])
    async users() {
        return User.find({ relations: ['avatar'] })
    }

    @Query(() => User)
    async getUserByToken(@Arg('token') token: string) {
        const user = await User.findOneBy({ token })
        if (!user) {
            throw new GraphQLError('Aucun utilisateur trouvé avec ce token')
        }
        return user
    }

    @Mutation(() => UserWithoutPassword)
    async registrationWithToken(@Arg('data') data: InputRegistrationWithToken) {
        const user = await User.findOne({ where: { token: data.token } })
        if (!user) {
            throw new GraphQLError('Aucun utilisateur trouvé avec ce token')
        }

        Object.assign(user, {
            ...data,
            token: null,
        })

        await user.save()

        return user
    }

    @Mutation(() => UserWithoutPassword)
    async register(@Arg('data') data: InputRegister) {
        const { pseudo, email, password, avatar } = data

        const user = await findUserByEmail(email)
        if (user) {
            throw new GraphQLError('Cet utilisateur existe déjà')
        }

        const newUser = await createUser({ pseudo, email, password, avatar })

        return newUser
    }

    @Query(() => ResponseMessage)
    async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
        const user = await findUserByEmail(infos.email)

        if (!user) {
            throw new GraphQLError(`User doesn't exist`)
        }

        const isPasswordValid = await argon2.verify(
            user.password,
            infos.password
        )
        const responseMessage = new ResponseMessage()
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
    @Query(() => ResponseMessage)
    async testAuthorized() {
        const responseMessage = new ResponseMessage()
        responseMessage.message = 'Tu es arrive a cette query'
        responseMessage.success = true
        return responseMessage
    }

    @Query(() => UserInfos)
    async getUserInfos(@Ctx() ctx: MyContext) {
        if (!ctx.user) {
            throw new GraphQLError(
                'Merci de vous identifier pour accéder à cette page'
            )
        }
        const userData = await User.findOne({
            where: { email: ctx.user.email },
            relations: ['avatar'],
        })

        if (!userData) throw new GraphQLError('Cannot find user')

        return {
            id: userData.id,
            pseudo: userData.pseudo,
            email: userData.email,
            avatar: userData.avatar,
            // discussions: userData.discussions,
        }
    }

    @Query(() => ResponseMessage)
    async logout(@Ctx() ctx: MyContext) {
        if (ctx.user) {
            const cookies = new Cookies(ctx.req, ctx.res)
            cookies.set('token')
        }
        const responseMessage = new ResponseMessage()

        responseMessage.message = 'Vous avez été déconnecté'
        responseMessage.success = true

        return responseMessage
    }

    @Mutation(() => UserWithoutPassword)
    async updateUser(
        @Arg('data') data: InputUpdateUser,
        @Ctx() ctx: MyContext
    ) {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }
        const user = await User.findOne({ where: { id: ctx.user.id } })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }
        if (data.email) {
            const existingUser = await User.findOne({
                where: { email: data.email },
            })
            if (existingUser && existingUser.id !== user.id) {
                throw new GraphQLError('cet email est déjà utilisé')
            }
            user.email = data.email
        }
        if (data.pseudo) {
            user.pseudo = data.pseudo
        }
        await user.save()
        return {
            email: user.email,
            pseudo: user.pseudo,
        }
    }
    @Mutation(() => UserWithoutPasswordAvatar)
    async updateAvatar(
        @Arg('data') data: InputUpdateAvatar,
        @Ctx() ctx: MyContext
    ) {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }
        const user = await User.findOne({
            where: { id: ctx.user.id },
            relations: ['avatar'],
        })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }
        const newAvatar = await Avatar.findOne({ where: { id: data.avatarId } })
        if (!newAvatar) {
            throw new GraphQLError('Avatar non trouvé')
        }
        user.avatar = newAvatar
        await user.save()
        return {
            email: user.email,
            pseudo: user.pseudo,
            avatar: user.avatar,
        }
    }
}

export default UsersResolver

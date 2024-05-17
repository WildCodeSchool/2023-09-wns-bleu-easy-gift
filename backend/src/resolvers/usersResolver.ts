import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
// import { Not } from 'typeorm'
import { GraphQLError } from 'graphql'
// import { validate } from 'class-validator'
import {
    User,
    // NewUserInput,
    UserWithoutPassword,
    InputRegister,
    InputLogin,
    ResponseMessage,
    UserInfos,
    InputRegistrationWithToken,
} from '../entities/user'
import * as argon2 from 'argon2'
import { SignJWT } from 'jose'
import { MyContext } from '..'
import Cookies from 'cookies'
import { Avatar } from '../entities/avatar'
import crypto from 'crypto'
import { getUsersByGroup } from './usersToGroupsResolver'


export async function findUserByEmail(email: string) {
    return await User.findOneBy({ email })
}

// async function createUser({ pseudo, email, password }: InputRegister) {
//     // Générer un identifiant d'avatar aléatoire entre 1 et 31
//     const randomAvatarId = Math.floor(Math.random() * 31) + 1

//     // Récupérer l'avatar correspondant à l'ID aléatoire
//     const avatar = await Avatar.findOne({ where: { id: randomAvatarId } })

//     // Vérifier si l'avatar correspondant à l'ID existe
//     if (!avatar) {
//         throw new Error(`Avatar with ID ${randomAvatarId} not found`)
//     }

//     return await User.create({ pseudo, email, password, avatar }).save()
// }

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


    @Query(() => [User])
    async getUsersByGroup(@Arg('group_id') group_id: number) {

        const UsersGroup = await getUsersByGroup(group_id);

        const userId =


            console.log("ICIIIIIIIIIIIIIIIIIIIIIII", UsersGroup);

        return
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

        // const randomAvatarId = Math.floor(Math.random() * 31) + 1
        // const randomAvatar = await Avatar.findOne({
        //     where: { id: randomAvatarId },
        // })

        // const newUser = await User.create({
        //     pseudo,
        //     email,
        //     password,
        //     avatar: avatar !== undefined ? avatar : randomAvatar,
        // }).save()

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
            infos.password,
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
            throw new GraphQLError("No JWT, t'es crazy (gift)")
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
}

export default UsersResolver

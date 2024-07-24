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
    InputUpdatePassword,
} from '../entities/user'
import * as argon2 from 'argon2'
import { SignJWT } from 'jose'
import { MyContext } from '..'
import Cookies from 'cookies'
import { Avatar } from '../entities/avatar'
import crypto from 'crypto'
import mailer from '../mailer'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.SITE_URL || 'http://localhost:3000'

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
    async registrationWithToken(
        @Arg('data', { validate: true }) data: InputRegistrationWithToken
    ) {
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
    async register(@Arg('data', { validate: true }) data: InputRegister) {
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
            throw new GraphQLError(`Veuillez vérifier vos informations`)
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
        responseMessage.message = 'Tu es arrivé a cette query'
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
        @Arg('data', { validate: true }) data: InputUpdateUser,
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

    @Mutation(() => ResponseMessage)
    @Authorized()
    async updatePassword(
        @Arg('data') data: InputUpdatePassword,
        @Ctx() ctx: MyContext
    ): Promise<ResponseMessage> {
        if (!ctx.user) {
            throw new GraphQLError("L'utilisateur n'est pas authentifié")
        }
        const user = await User.findOne({ where: { id: ctx.user.id } })
        if (!user) {
            throw new GraphQLError('Utilisateur non trouvé')
        }
        const isOldPasswordValid = await argon2.verify(
            user.password,
            data.oldPassword
        )
        if (!isOldPasswordValid) {
            throw new GraphQLError("L'ancien mot de passe est incorrect")
        }
        user.password = data.newPassword
        await user.save()

        const responseMessage = new ResponseMessage()
        responseMessage.success = true
        responseMessage.message = 'Mot de passe modifié avec succès'

        return responseMessage
    }
    @Mutation(() => ResponseMessage)
    async forgotPassword(
        @Arg('email') email: string
    ): Promise<ResponseMessage> {
        const user = await User.findOne({ where: { email } })
        const responseMessage = new ResponseMessage()
        if (!user) {
            responseMessage.success = false
            responseMessage.message = 'Email non trouvé'
            return responseMessage
        }
        const resetToken = crypto.randomBytes(32).toString('hex')
        user.token = resetToken
        await user.save()

        const resetUrl = `${url}/auth/reset-password?token=${resetToken}`
        const message = `
            <h1>Vous avez demandé une réinitialisation du mot de passe</h1>
            <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe:</p>
            <a href="${resetUrl}">${resetUrl}</a>
        `
        try {
            await mailer.sendMail({
                to: email,
                from: 'crazygift24@gmail.com',
                subject: 'Réinitialisation du mot de passe',
                html: message,
            })
            responseMessage.success = true
            responseMessage.message = 'Email envoyé avec succès'
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email:", err)
            responseMessage.success = false
            responseMessage.message = "Erreur lors de l'envoi de l'email"
        }
        return responseMessage
    }
    @Mutation(() => ResponseMessage)
    async resetPassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string
    ): Promise<ResponseMessage> {
        const user = await User.findOne({ where: { token } })
        const responseMessage = new ResponseMessage()
        if (!user) {
            responseMessage.success = false
            responseMessage.message = 'Token invalide'
            return responseMessage
        }

        user.password = newPassword
        user.token = null
        await user.save()

        responseMessage.success = true
        responseMessage.message = 'Mot de passe réinitialisé avec succès'
        return responseMessage
    }
}

export default UsersResolver

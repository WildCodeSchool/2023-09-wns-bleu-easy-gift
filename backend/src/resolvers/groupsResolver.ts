import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { getRepository } from 'typeorm'
import { Group, NewGroupInput } from '../entities/group'
import { UserToGroup, NewGroupUserInput } from '../entities/userToGroup'
import { User } from '../entities/user'
import { MyContext } from '..'
import { createUser, findUserByEmail } from './usersResolver'

import mailer from '../mailer'

import { In } from 'typeorm'
import { Avatar } from '../entities/avatar'


export async function findGroupByName(name: string) {
    return await Group.findOneBy({ name })
}

async function createGroup(name: string) {
    return await Group.create({ name }).save()
}

async function createUserToGroup({
    group_id,
    user_id,
    is_admin,
}: NewGroupUserInput) {
    return await UserToGroup.create({
        group_id,
        user_id,
        is_admin,
    }).save()
}

@Resolver(Group)
class GroupsResolver {
    @Query(() => [Group])
    async groups() {
        return Group.find({ relations: ['avatar'] })
    }

    @Query(() => [Group])
    async userGroups(@Ctx() ctx: MyContext) {
        if (!ctx.user)
            throw new GraphQLError(
                'Il faut être connecté pour voir tes groupes',
            )

        // SELECT * FROM group WHERE id IN ([1, 2, 3])
        // SELECT * FROM group WHERE id IN (SELECT group_id FROM user_to_group WHERE user_id = ctx.user.id)

        const groupIds = (
            await UserToGroup.findBy({ user_id: ctx.user.id })
        ).map(utg => utg.group_id)

        // WORKING well but not returning the avatars
        // const ctxUserGroups = await Group.findBy({
        //     id: In(groupIds),
        // })

        // ENABLE TO GET AVATAR
        const ctxUserGroups = await Group.createQueryBuilder('group')
            .leftJoinAndSelect('group.avatar', 'avatar')
            .whereInIds(groupIds)
            .getMany()

        // not working
        // const haha = await UserToGroup.find({
        //     relations: { group: true },
        //     where: { user_id: ctx.user.id },
        // })

        return ctxUserGroups
    }

    @Authorized()
    @Mutation(() => Group)
    async addNewGroup(@Ctx() ctx: MyContext, @Arg('data') data: NewGroupInput) {
        const { name, emailUsers } = data
        const group = await findGroupByName(name)

        const groupAvatars = await Avatar.find({ where: { type: 'generic' } })
        const randomGroupAvatar =
            groupAvatars[Math.floor(Math.random() * groupAvatars.length)]

        if (group) {
            throw new GraphQLError(
                `Group already exist, fait pas trop le malin.`,
            )
        }
        const newGroup = await createGroup(name)

        if (randomGroupAvatar) {
            newGroup.avatar = randomGroupAvatar
            await newGroup.save()
        }

        if (!ctx.user) throw new GraphQLError("No JWT, t'es crazy (gift)")

        await createUserToGroup({
            group_id: newGroup.id,
            user_id: ctx.user?.id,
            is_admin: true,
        })

        emailUsers.forEach(async email => {
            if (email === ctx.user?.email) return

            const isUser = await findUserByEmail(email)
            if (isUser) {
                await createUserToGroup({
                    group_id: newGroup.id,
                    user_id: isUser.id,
                    is_admin: false,
                })
                return
            }

            const pseudo = email.split('@')[0]

            const password = 'Test@1234' // TODO

            const newUser = await createUser({ pseudo, email, password })

            await createUserToGroup({
                group_id: newGroup.id,
                user_id: newUser.id,
                is_admin: false,
            })

            try {
                await mailer.sendMail({
                    subject: `Bienvenue sur EasyGift ${pseudo}, une action de ta part est requise!`,
                    to: email,
                    from: 'crazygift24@gmail.com',
                    text: `Bienvenue sur EasyGift ${pseudo}, ${ctx.user?.pseudo} vient de t'ajouter au groupe d'echange de cadeau : ${name}. Une action de ta part est requise, pour confirmer ton inscription au groupe, clique sur le lien suivant : http://localhost:3000/confirm-participation?token=${newUser.token}`,
                })
            } catch (error) {
                console.log('______________ Error sending mail', error)
                throw new GraphQLError("Erreur d'envoi de mail")
            }
        })

        return newGroup
    }

    // @Query(() => ResponseMessage)
    // async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
    //     const user = await findUserByEmail(infos.email)

    //     if (!user) {
    //         throw new GraphQLError(`User doesn't exist`)
    //     }

    //     const isPasswordValid = await argon2.verify(
    //         user.password,
    //         infos.password,
    //     )
    //     const responseMessage = new ResponseMessage()
    //     if (isPasswordValid) {
    //         const token = await new SignJWT({ email: user.email })
    //             .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
    //             .setExpirationTime('2h')
    //             .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

    //         const cookies = new Cookies(ctx.req, ctx.res)
    //         cookies.set('token', token, { httpOnly: true })

    //         responseMessage.message = 'Bienvenue!'
    //         responseMessage.success = true
    //     } else {
    //         responseMessage.message = 'Vérifiez vos informations'
    //         responseMessage.success = false
    //     }

    //     return responseMessage
    // }

    // @Authorized()
    // @Query(() => ResponseMessage)
    // async testAuthorized() {
    //     const responseMessage = new ResponseMessage()
    //     responseMessage.message = 'Tu es arrive a cette query'
    //     responseMessage.success = true
    //     return responseMessage
    // }

    // @Query(() => UserInfos)
    // async getUserInfos(@Ctx() ctx: MyContext) {
    //     if (!ctx.user) {
    //         throw new GraphQLError("No JWT, t'es crazy (gift)")
    //     }
    //     const userData = await User.findOneBy({ email: ctx.user.email })

    //     if (!userData) throw new GraphQLError('Cannot find user')

    //     return {
    //         id: userData.id,
    //         pseudo: userData.pseudo,
    //         email: userData.email,
    //     }
    // }

    // @Query(() => ResponseMessage)
    // async logout(@Ctx() ctx: MyContext) {
    //     if (ctx.user) {
    //         const cookies = new Cookies(ctx.req, ctx.res)
    //         cookies.set('token')
    //     }
    //     const responseMessage = new ResponseMessage()

    //     responseMessage.message = 'Vous avez été déconnecté'
    //     responseMessage.success = true

    //     return responseMessage
    // }
}

export default GroupsResolver

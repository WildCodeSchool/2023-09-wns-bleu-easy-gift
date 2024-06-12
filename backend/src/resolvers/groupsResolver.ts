import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { Group, NewGroupInput } from '../entities/group'
import { UserToGroup, NewGroupUserInput } from '../entities/userToGroup'
import { MyContext } from '..'
import { createUser, findUserByEmail } from './usersResolver'

import mailer from '../mailer'

import { Avatar } from '../entities/avatar'
import { createGroupDiscussions } from './discussionsResolver'
import { User } from '../entities/user'

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

        return ctxUserGroups
    }

    @Query(() => [Group])
    async getUsersByGroup(@Arg('id') id: number, @Ctx() ctx: MyContext) {
        if (!ctx.user)
            throw new GraphQLError(
                'Il faut être connecté pour voir les membres du groupe',
            )

        const group = await Group.findOne({
            where: { id },
            relations: ['userToGroups', 'userToGroups.user'],
        })

        if (!group) {
            throw new GraphQLError('Group not found')
        }

        return group.userToGroups.map(utg => utg.user)
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

        const groupUsers = emailUsers.map(email => {
            return (async () => {
                if (email === ctx.user?.email) return

                const isUser = await findUserByEmail(email)
                if (isUser) {
                    await createUserToGroup({
                        group_id: newGroup.id,
                        user_id: isUser.id,
                        is_admin: false,
                    })
                    return isUser
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

                    return newUser
                } catch (error) {
                    console.log('______________ Error sending mail', error)
                    throw new GraphQLError("Erreur d'envoi de mail")
                }
            })()
        })

        Promise.all(groupUsers).then(async groupUsers => {
            console.log('____________________UnfilteredUsers', groupUsers)
            // Cause of the check in the usermailsList, email !== ctx.user?.email must return undefined
            const filteredGroupUsers = ctx.user
                ? [ctx.user, ...groupUsers.filter(user => user !== undefined)]
                : groupUsers.filter(user => user !== undefined)

            createGroupDiscussions({
                groupUsers: filteredGroupUsers as User[],
                groupId: newGroup.id,
            })
        })

        return newGroup
    }
}

export default GroupsResolver

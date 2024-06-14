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
import { In } from 'typeorm'

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
        return Group.find({ relations: ['avatar', 'userToGroups.user'] })
    }

    @Query(() => [Group])
    async userGroups(@Ctx() ctx: MyContext) {
        if (!ctx.user)
            throw new GraphQLError(
                'Il faut être connecté pour voir tes groupes',
            )
        console.log('___________', ctx.user.userToGroups)
        const userGroupsIds =
            ctx.user.userToGroups.map(value => value.group_id) || undefined

        if (!userGroupsIds) {
            throw new GraphQLError('Group not found')
        }
        return Group.find({
            where: {
                id: In(userGroupsIds),
            },
            relations: [
                'avatar',
                'userToGroups.user.avatar',
                'userToGroups.group',
            ],
        })
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

        const groupUsers = emailUsers.map(async email => {
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
        })

        await Promise.all(groupUsers).then(async groupUsers => {
            // Cause of the check in the usermailsList, email !== ctx.user?.email must return undefined
            const filteredGroupUsers = ctx.user
                ? [ctx.user, ...groupUsers.filter(user => user !== undefined)]
                : groupUsers.filter(user => user !== undefined)

            await createGroupDiscussions({
                groupUsers: filteredGroupUsers as User[],
                groupId: newGroup.id,
            })
        })

        return newGroup
    }

    @Authorized()
    @Mutation(() => Group)
    async updateGroupAvatar(
        @Arg('group_id') group_id: number,
        @Arg('avatar_id') avatar_id: number,
    ) {
        const group = await Group.findOne({ where: { id: group_id } })
        if (!group) throw new GraphQLError('Group not found')

        const avatar = await Avatar.findOne({ where: { id: avatar_id } })
        if (!avatar) throw new GraphQLError('Avatar not found')

        group.avatar = avatar
        await group.save()

        return group
    }
}

export default GroupsResolver

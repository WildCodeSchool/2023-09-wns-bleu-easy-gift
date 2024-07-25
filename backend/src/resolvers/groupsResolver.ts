import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx,
    Authorized,
    Int,
} from 'type-graphql'
import { GraphQLError } from 'graphql'
import {
    Group,
    NewGroupInput,
    UpdateGroupInput,
    addNewMemberToGroup,
} from '../entities/group'
import { UserToGroup, NewGroupUserInput } from '../entities/userToGroup'
import { MyContext } from '..'
import { createUser, findUserByEmail } from './usersResolver'

import mailer from '../mailer'

import { Avatar } from '../entities/avatar'
import {
    addGroupDiscussions,
    createGroupDiscussions,
} from './discussionsResolver'
import { User } from '../entities/user'
import { In } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.SITE_URL || 'http://localhost:3000'

export async function findGroupByName(name: string) {
    return await Group.findOneBy({ name })
}

async function createGroup(name: string, event_date: string) {
    return await Group.create({ name, event_date }).save()
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
        return Group.find({
            relations: ['avatar', 'userToGroups.user'],
        })
    }

    @Query(() => Group)
    async getGroupById(
        @Ctx() ctx: MyContext,
        @Arg('groupId', () => Int) id: number
    ) {
        if (!ctx.user) {
            throw new GraphQLError('Il faut être connecté pour voir ce groupe')
        }
        const group = await Group.findOne({
            where: { id },
            relations: [
                'avatar',
                'userToGroups',
                'userToGroups.user',
                'userToGroups.user.avatar',
            ],
        })
        if (
            group?.userToGroups.some(
                userToGroup => userToGroup.user_id === ctx.user?.id
            )
        ) {
            return group
        }

        throw new GraphQLError("Vous n'avez pas accès à ce groupe")
    }

    @Query(() => [Group])
    async userGroups(@Ctx() ctx: MyContext) {
        if (!ctx.user)
            throw new GraphQLError(
                'Il faut être connecté pour voir tes groupes'
            )
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
            order: {
                created_at: 'DESC',
            },
        })
    }

    @Query(() => [Group])
    async getUsersByGroup(@Arg('id') id: number, @Ctx() ctx: MyContext) {
        if (!ctx.user)
            throw new GraphQLError(
                'Il faut être connecté pour voir les membres du groupe'
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
    async addNewGroup(
        @Ctx() ctx: MyContext,
        @Arg('data', { validate: true }) data: NewGroupInput
    ) {
        if (!ctx.user) throw new GraphQLError("No JWT, t'es crazy (gift)")

        const { name, emailUsers, event_date } = data
        const groupAvatars = await Avatar.find({ where: { type: 'generic' } })
        const randomGroupAvatar =
            groupAvatars[Math.floor(Math.random() * groupAvatars.length)]

        const newGroup = await createGroup(name, event_date)

        if (randomGroupAvatar) {
            newGroup.avatar = randomGroupAvatar
            await newGroup.save()
        }

        await createUserToGroup({
            group_id: newGroup.id,
            user_id: ctx.user?.id,
            is_admin: true,
        })

        const groupUsers = emailUsers.map(async email => {
            // retrun le user
            if (email === ctx.user?.email) return

            const isUser = await findUserByEmail(email)
            if (isUser) {
                await createUserToGroup({
                    group_id: newGroup.id,
                    user_id: isUser.id,
                    is_admin: false,
                })
                try {
                    console.log('DANS INVITATION MAIL')
                    console.log('TO', email)
                    await mailer.sendMail({
                        subject: `Bienvenue sur le groupe ${name} !`,
                        to: email,
                        from: 'crazygift24@gmail.com',
                        text: `Bienvenue dans le groupe ${name}, ${ctx.user?.pseudo} vient de t'ajouter au groupe d'échange de cadeau : ${name}.
                        Connecte toi vite pour commencer à discuter : ${url}/group/${newGroup.id}`,
                    })
                    return isUser
                } catch (error) {
                    console.log('DANS LE ERROR INVITATIONMAIL')
                    console.log('ERROR', error)
                    throw new GraphQLError("Erreur d'envoi de mail")
                }
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
                console.log('DANS creation MAIL')
                console.log('TO', email)
                await mailer.sendMail({
                    subject: `Bienvenue sur EasyGift ${pseudo}, une action de ta part est requise!`,
                    to: email,
                    from: 'crazygift24@gmail.com',
                    text: `Bienvenue sur EasyGift ${pseudo}, ${ctx.user?.pseudo} vient de t'ajouter au groupe d'échange de cadeau : ${name}.
                     Une action de ta part est requise, pour confirmer ton inscription au groupe, clique sur le lien suivant
                      : ${url}/confirm-participation?token=${newUser.token}`,
                })

                return newUser
            } catch (error) {
                console.log('DANS LE ERROR CREATION MAIL')
                console.log('ERROR1', error)
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
        @Arg('avatar_id') avatar_id: number
    ) {
        const group = await Group.findOne({ where: { id: group_id } })
        if (!group) throw new GraphQLError('Group not found')

        const avatar = await Avatar.findOne({ where: { id: avatar_id } })
        if (!avatar) throw new GraphQLError('Avatar not found')

        group.avatar = avatar
        await group.save()

        return group
    }
    @Mutation(() => Group)
    async updateGroup(
        @Arg('groupId') id: number,
        @Arg('data', { validate: true }) data: UpdateGroupInput,
        @Ctx() ctx: MyContext
    ) {
        const user = ctx.user || undefined
        if (typeof user === 'undefined')
            throw new GraphQLError('Connect toi pour editer le groupe')
        const groupToUpdate = await Group.findOne({
            where: { id },
            relations: [
                'avatar',
                'userToGroups',
                'userToGroups.user',
                'userToGroups.user.avatar',
            ],
        })

        if (!groupToUpdate) throw new GraphQLError("Le groupe n'existe pas")

        const groupAdmin = groupToUpdate.userToGroups
            .filter(user => user.is_admin)
            .map(user => user.user_id)

        if (!groupAdmin.includes(user?.id))
            throw new GraphQLError('Tu dois être un administrateur du groupe')

        Object.assign(groupToUpdate, data)
        await groupToUpdate.save()

        return Group.findOne({
            where: { id },
            relations: [
                'avatar',
                'userToGroups',
                'userToGroups.user',
                'userToGroups.user.avatar',
            ],
        })
    }

    @Mutation(() => Group)
    async addNewMembersToGroup(
        @Arg('groupId') id: number,
        @Arg('data', { validate: true }) data: addNewMemberToGroup,
        @Ctx() ctx: MyContext
    ) {
        const user = ctx.user || undefined
        if (typeof user === 'undefined')
            throw new GraphQLError('Connecte toi pour editer le groupe')

        const groupToUpdate = await Group.findOne({
            where: { id },
            relations: ['userToGroups', 'userToGroups.user'],
        })

        if (!groupToUpdate) throw new GraphQLError("Le groupe n'existe pas")

        const groupAdmin = groupToUpdate.userToGroups
            .filter(user => user.is_admin)
            .map(user => user.user_id)

        if (!groupAdmin.includes(user?.id))
            throw new GraphQLError('Tu dois être un administrateur du groupe')

        const actualMailsMembers = groupToUpdate.userToGroups.map(
            value => value.user.email
        )
        const futureMailsMembers = data.emailUsers

        const newGroupUsers = futureMailsMembers.map(async value => {
            if (value === ctx.user?.email) return

            if (actualMailsMembers.includes(value)) return

            const isUser = await findUserByEmail(value)
            if (isUser) {
                await createUserToGroup({
                    group_id: id,
                    user_id: isUser.id,
                    is_admin: false,
                })
                try {
                    await mailer.sendMail({
                        subject: `Bienvenue sur le groupe ${groupToUpdate.name} !`,
                        to: value,
                        from: 'crazygift24@gmail.com',
                        text: `Bienvenue dans le groupe ${groupToUpdate.name}, ${ctx.user?.pseudo} vient de t'ajouter au groupe d'échange de cadeau : ${groupToUpdate.name}.
                        Connecte toi vite pour commencer à discuter : ${url}/group/${id}`,
                    })
                    return isUser
                } catch (error) {
                    throw new GraphQLError("Erreur d'envoi de mail")
                }
            }

            const pseudo = value.split('@')[0]

            const password = 'Test@1234' // TODO

            const email = value

            const newUser = await createUser({ pseudo, email, password })

            await createUserToGroup({
                group_id: id,
                user_id: newUser.id,
                is_admin: false,
            })

            try {
                await mailer.sendMail({
                    subject: `Bienvenue sur EasyGift ${pseudo}, une action de ta part est requise!`,
                    to: value,
                    from: 'crazygift24@gmail.com',
                    text: `Bienvenue sur EasyGift ${pseudo}, ${ctx.user?.pseudo} vient de t'ajouter au groupe d'échange de cadeau : ${groupToUpdate.name}.
                     Une action de ta part est requise, pour confirmer ton inscription au groupe, clique sur le lien suivant
                      : ${url}/confirm-participation?token=${newUser.token}`,
                })

                return newUser
            } catch (error) {
                throw new GraphQLError("Erreur d'envoi de mail new user")
            }
        })

        await Promise.all(newGroupUsers).then(async groupUsers => {
            // Cause of the check in the usermailsList, email !== ctx.user?.email must return undefined
            const filteredGroupUsers = groupUsers.filter(
                user => user !== undefined
            )
            await addGroupDiscussions({
                newUsers: filteredGroupUsers as User[],
                groupId: id,
            })
        })

        return Group.findOne({
            where: { id },
            relations: [
                'avatar',
                'userToGroups',
                'userToGroups.user',
                'userToGroups.user.avatar',
            ],
        })
    }
}

export default GroupsResolver

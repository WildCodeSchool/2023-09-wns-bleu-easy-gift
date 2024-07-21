import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Discussion } from '../entities/discussion'
import { User } from '../entities/user'
import { Group } from '../entities/group'
import { GraphQLError } from 'graphql'
import { MyContext } from '..'
import { UserToGroup } from '../entities/userToGroup'
import { Avatar } from '../entities/avatar'

async function createDiscussion({
    name,
    groupId,
    participantUsers,
}: {
    name: string
    groupId: number
    participantUsers: User[]
}) {
    const newDiscussion = await Discussion.create({ name })
    const group = await Group.findOne({ where: { id: groupId } })

    if (!group) throw new GraphQLError(`Can't find group `)

    newDiscussion.group = group
    newDiscussion.users = participantUsers
    return await newDiscussion.save()
}

export async function createGroupDiscussions({
    groupUsers,
    groupId,
}: {
    groupUsers: User[]
    groupId: number
}) {
    await Promise.all(
        groupUsers.map(async currentUser => {
            const participantUsers = groupUsers.filter(
                user => user.id !== currentUser.id
            )

            return await createDiscussion({
                name: currentUser.pseudo,
                groupId,
                participantUsers,
            })
        })
    )
}

@Resolver(Discussion)
class DiscussionResolver {
    @Query(() => [Discussion])
    async getDiscussions() {
        return await Discussion.find({
            relations: ['group', 'messages', 'users'],
        })
    }

    @Authorized()
    @Query(() => Discussion)
    async getDiscussionByUserPseudo(
        @Ctx() ctx: MyContext,
        @Arg('groupId') groupId: number,
    ) {

        const userDiscussion = await Discussion.findOne({
            where: { group: { id: groupId }, name: ctx.user?.pseudo },
            relations: ['group', 'group.avatar', 'messages', 'users', 'users.avatar'],
        });

        if (!userDiscussion) return new GraphQLError('Discussion not found');

        const filteredUsers = userDiscussion.users?.filter(user =>
            user.pseudo !== ctx.user?.pseudo);
        userDiscussion.users = filteredUsers;

        userDiscussion.users = userDiscussion.users?.map(user => ({
            id: user.id,
            pseudo: user.pseudo,
            avatar: {
                url: user.avatar ? user.avatar.url : null,
            }

        } as User));


        return userDiscussion;

    }
}

export default DiscussionResolver

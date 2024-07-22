import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Discussion } from '../entities/discussion'
import { User } from '../entities/user'
import { Group } from '../entities/group'
import { GraphQLError } from 'graphql'
import { MyContext } from '..'
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
    return newDiscussion.save()
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
    @Query(() => [Discussion])
    async getDiscussionsByGroupIdWithoutCtxUser(
        @Ctx() ctx: MyContext,
        @Arg('groupId') groupId: number
    ) {
        const groupDiscussions = await Discussion.find({
            where: { group: { id: groupId } },
            relations: ['group', 'messages', 'users'],
        })
        return groupDiscussions.filter(
            discussion => discussion.name !== ctx.user?.pseudo
        )
    }
}

export default DiscussionResolver

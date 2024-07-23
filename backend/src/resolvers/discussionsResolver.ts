import {
    Arg,
    Authorized,
    Ctx,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql'
import { Discussion, GroupDiscussionsResponse } from '../entities/discussion'
import { User } from '../entities/user'
import { Group } from '../entities/group'
import { GraphQLError } from 'graphql'
import { MyContext } from '..'

async function createDiscussion({
    // name,
    userDiscussion,
    groupId,
    participantUsers,
}: {
    // name: string
    userDiscussion: User
    groupId: number
    participantUsers: User[]
}) {
    // pubsub: PubSubEngine,
    const newDiscussion = Discussion.create({ userDiscussion })
    const group = await Group.findOne({ where: { id: groupId } })

    if (!group) throw new GraphQLError(`Can't find group `)

    newDiscussion.group = group
    newDiscussion.users = participantUsers

    return await newDiscussion.save()

    // pubsub.publish('NEW_DISCUSSION', newDiscussion)
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
                // name: currentUser.pseudo,
                userDiscussion: currentUser,
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
    @Subscription(() => Discussion, {
        topics: 'NEW_DISCUSSION',
    })
    newDiscussion(@Root() discussion: Discussion): Discussion {
        return discussion
    }

    @Authorized()
    @Query(() => GroupDiscussionsResponse)
    async getDiscussionsByGroupIdWithoutCtxUser(
        @Ctx() ctx: MyContext,
        @Arg('groupId') groupId: number
    ) {
        const groupDiscussions = await Discussion.find({
            where: { group: { id: groupId } },
            relations: [
                'group',
                'group.avatar',
                'messages',
                'users',
                'userDiscussion',
                'userDiscussion.avatar',
            ],
        })
        const discussions = groupDiscussions.filter(
            discussion => discussion.userDiscussion.pseudo !== ctx.user?.pseudo
        )

        const groupData = groupDiscussions[0].group

        if (!groupData) throw new GraphQLError('Group not found')

        return {
            discussions,
            groupName: groupData.name,
            groupAvatarUrl: groupData.avatar.url,
        }
    }

    @Authorized()
    @Query(() => Discussion)
    async getDiscussionById(
        @Ctx() ctx: MyContext,
        @Arg('discussionId') discussionId: number
    ) {
        const discussion = await Discussion.findOne({
            where: { id: discussionId },
            relations: [
                'group',
                'group.avatar',
                'messages',
                'users',
                'userDiscussion',
                'userDiscussion.avatar',
            ],
        })

        if (!discussion) throw new GraphQLError('Discussion not found')
        if (discussion.userDiscussion.pseudo !== ctx.user?.pseudo)
            throw new GraphQLError('You are not allowed to see this discussion')

        return discussion
    }
}

export default DiscussionResolver

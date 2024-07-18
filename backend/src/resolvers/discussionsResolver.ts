import {
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql'
import { Discussion } from '../entities/discussion'
import { User } from '../entities/user'
import { Group } from '../entities/group'
import { GraphQLError } from 'graphql'

async function createDiscussion({
    name,
    groupId,
    participantUsers,
}: {
    name: string
    groupId: number
    participantUsers: User[]
}) {
    // pubsub: PubSubEngine,
    const newDiscussion = await Discussion.create({ name })
    const group = await Group.findOne({ where: { id: groupId } })

    if (!group) throw new GraphQLError(`Can't find group `)

    newDiscussion.group = group
    newDiscussion.users = participantUsers

    return newDiscussion.save()

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
                name: currentUser.pseudo,
                groupId,
                participantUsers,
            })
            // groupUsers.forEach(currentUser => {
            //     const participantUsers = groupUsers.filter(
            //         user => user.id !== currentUser.id,
            //     )
            //     console.log('Creating discussion for user:', currentUser.pseudo)

            //     createDiscussion(
            //         {
            //             name: currentUser.pseudo,
            //             groupId,
            //             participantUsers,
            //         },
            //     )
            // }
        })
    )
}

@Resolver(Discussion)
class DiscussionResolver {
    @Query(() => [Discussion])
    async getDiscusions() {
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
}

export default DiscussionResolver

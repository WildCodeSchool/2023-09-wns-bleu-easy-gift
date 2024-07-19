import {
    Arg,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql'
import { User } from '../entities/user'
import { Message } from '../entities/message'
import { Discussion } from '../entities/discussion'

@Resolver(Message)
class MessageResolver {
    @Query(() => [Message])
    async getMessagesByDisscution(
        @Arg('discussionId') discussionId: number,
    ): Promise<Message[]> {
        return await Message.find({
            where: { discussion: { id: discussionId } },
            order: { created_at: 'ASC' },
            relations: ['user'],
        })
    }
    @Mutation(() => Message)
    async createMessage(
        @Arg('content') content: string,
        @Arg('userId') userId: number,
        @Arg('discussionId') discussionId: number,
        @PubSub() pubsub: PubSubEngine,
    ): Promise<Message> {
        const message = new Message()
        message.content = content
        message.user = await User.findOneOrFail({ where: { id: userId } })
        message.discussion = await Discussion.findOneOrFail({
            where: { id: discussionId },
        })

        await message.save()
        await pubsub.publish(`NEW_DISCUSSION_${discussionId}`, message)
        return message
    }
    @Subscription(() => Message, {
        topics: ({ args }) => `NEW_DISCUSSION_${args.discussionId}`,
    })
    newMessage(
        @Arg('discussionId') discussionId: number,
        @Root() newMessage: Message,
    ): Message {
        return newMessage
    }
}
export default MessageResolver

// import {
//     Resolver,
//     Query,
//     Arg,
//     Mutation,
//     Ctx,
//     Authorized,
//     Subscription,
//     PubSubEngine,
//     PubSub,
//     Root,
// } from 'type-graphql'
// import { SubscriptionResponse, TestSubscription } from '../entities/test'

// @Resolver(TestSubscription)
// class TestResolver {
//     @Mutation(() => SubscriptionResponse)
//     async subscription(
//         @Arg('message') message: string,
//         @PubSub() pubsub: PubSubEngine,
//     ) {
//         await pubsub.publish('TEST_SUBSCRIPTION', message)
//         return {
//             message: 'Subscrbied',
//         }
//     }
//     @Subscription({ topics: 'TEST_SUBSCRIPTION' })
//     subscriptioReaction(
//         @Root() messageRecieved: SubscriptionResponse,
//     ): SubscriptionResponse {
//         console.log('___________________________Subscrbied')
//         return {
//             message: 'Coucou',
//         }
//     }
// }

// export default TestResolver

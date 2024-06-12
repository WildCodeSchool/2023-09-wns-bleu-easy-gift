import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'
import AvatarsResolver from './resolvers/avatarsResolver'
import { customAuthChecker } from './lib/authChecker'
import GroupsResolver from './resolvers/groupsResolver'
import UsersToGroupsResolver from './resolvers/usersToGroupsResolver'
import DiscussionResolver from './resolvers/discussionsResolver'

export default buildSchema({
    resolvers: [
        UsersResolver,
        GroupsResolver,
        AvatarsResolver,
        UsersToGroupsResolver,
        DiscussionResolver,
    ],
    authChecker: customAuthChecker,
})

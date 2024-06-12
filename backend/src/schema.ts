import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'
import AvatarsResolver from './resolvers/avatarsResolver'
import { customAuthChecker } from './lib/authChecker'
import GroupsResolver from './resolvers/groupsResolver'
import { UserToGroup } from './entities/userToGroup'
import UsersToGroupsResolver from './resolvers/usersToGroupsResolver'

export default buildSchema({
    resolvers: [
        UsersResolver,
        GroupsResolver,
        AvatarsResolver,
        UsersToGroupsResolver,
    ],
    authChecker: customAuthChecker,
})

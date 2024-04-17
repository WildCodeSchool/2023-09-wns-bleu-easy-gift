import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'
import AvatarsResolver from './resolvers/avatarsResolver'
import { customAuthChecker } from './lib/authChecker'
import GroupsResolver from './resolvers/groupsResolver'

export default buildSchema({
    resolvers: [UsersResolver, GroupsResolver, AvatarsResolver],
    authChecker: customAuthChecker,
})

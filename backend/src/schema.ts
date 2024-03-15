import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'
import { customAuthChecker } from './lib/authChecker'
import GroupsResolver from './resolvers/groupsResolver'

export default buildSchema({
    resolvers: [UsersResolver, GroupsResolver],
    authChecker: customAuthChecker,
})

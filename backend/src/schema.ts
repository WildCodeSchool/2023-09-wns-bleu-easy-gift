import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'
import { customAuthChecker } from './lib/authChecker'

export default buildSchema({
    resolvers: [UsersResolver],
    authChecker: customAuthChecker,
})

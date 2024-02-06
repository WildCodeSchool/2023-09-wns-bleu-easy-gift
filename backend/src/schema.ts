import { buildSchema } from 'type-graphql'
import UsersResolver from './resolvers/usersResolver'

export default buildSchema({
    resolvers: [UsersResolver],
})

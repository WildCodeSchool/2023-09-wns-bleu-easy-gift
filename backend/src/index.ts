import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import db from './db'
import UsersResolver from './resolvers/usersResolver'

const port = 4001

buildSchema({
    resolvers: [UsersResolver],
}).then(async schema => {
    await db.initialize()
    const server = new ApolloServer({ schema })
    const { url } = await startStandaloneServer(server, { listen: { port } })
    console.log(`graphql server listening on ${url}`)
})

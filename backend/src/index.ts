import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import schema from './schema'
import db from './db'

const port = 4001

schema.then(async schema => {
    await db.initialize()
    const server = new ApolloServer({ schema })
    const { url } = await startStandaloneServer(server, { listen: { port } })
    console.log(`graphql server listening on ${url}`)
})

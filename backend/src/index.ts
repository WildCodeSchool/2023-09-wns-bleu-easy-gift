import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import schema from './schema'
import db from './db'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import Cookies from 'cookies'
import { jwtVerify } from 'jose'
import { User } from './entities/user'
import { findUserByEmail } from './resolvers/usersResolver'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

dotenv.config()

export interface MyContext {
    req: express.Request
    res: express.Response
    user: User | null
}

export interface Payload {
    email: string
}

const port = 4001

const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
})

schema.then(async schema => {
    await db.initialize()
    const serverCleanup = useServer({ schema }, wsServer)
    const server = new ApolloServer<MyContext>({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    app.use(
        '/',
        cors<cors.CorsRequest>({
            origin: [
                'http://localhost:3000',
                'https://studio.apollographql.com',
                'https://staging.0923-bleu-3.wns.wilders.dev/',
            ],
            credentials: true,
        }),
        express.json(),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                let user: User | null = null

                const cookies = new Cookies(req, res)
                const token = cookies.get('token')

                if (token) {
                    try {
                        const verify = await jwtVerify<Payload>(
                            token,
                            new TextEncoder().encode(process.env.SECRET_KEY)
                        )
                        user = await findUserByEmail(verify.payload.email)
                    } catch (error) {
                        console.error('Error during JWT verification, ', error)
                    }
                }
                return { req, res, user }
            },
        })
    )

    // const { url } = await startStandaloneServer(server, { listen: { port } })

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
    console.log(`graphql server listening on http://localhost:${port}/}`)
})

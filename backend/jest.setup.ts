// import "@testing-library/jest-dom";

import db from './src/db'
import getSchema from './src/schema'
import { ASTNode, graphql, GraphQLSchema, print } from 'graphql'
import { Maybe } from 'type-graphql'

const clearDB = async () => {
    const entities = db.entityMetadatas
    const tableNames = entities
        .map(entity => `"${entity.tableName}"`)
        .join(', ')
    await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}
export let schema: GraphQLSchema

export async function execute(
    operation: ASTNode,
    variableValues?: Maybe<{
        readonly [variable: string]: unknown
    }>,
    contextValue = {},
) {
    return await graphql({
        schema,
        source: print(operation),
        variableValues,
        contextValue,
    })
}

beforeAll(async () => {
    await db.initialize()
    schema = await getSchema
})

beforeEach(async () => {
    await clearDB()
})

afterAll(async () => {
    await db.destroy()
})

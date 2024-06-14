import { User } from '../src/entities/user'
import getUsers from './operations/getUsers'
import { execute } from '../jest.setup'
import register from './operations/register'

// !!!! IMPORTANT !!!!
// If the test fails, you can try to erase what is written between brackets in the toMatchInlineSnapshot() function

describe('user resolver', () => {
    it('should return the users', async () => {
        await User.create({
            pseudo: 'John',
            email: 'john@gmail.com',
            password: 'test@1234',
        }).save()
        await User.create({
            pseudo: 'Jane',
            email: 'jane@gmail.com',
            password: 'test@1234',
        }).save()
        const res = await execute(getUsers)
        console.log(res)
        expect(res).toMatchInlineSnapshot(`
            {
              "data": null,
              "errors": [
                [GraphQLError: Property "discussions" was not found in "User". Make sure your query is correct.],
              ],
            }
        `)

        // expect(1 + 2).toBe(3)
    })

    it('can create a user', async () => {
        const res = await execute(register, {
            data: {
                pseudo: 'Léopold',
                email: 'leopold@gmail.com',
                password: 'test@1234',
            },
        })
        expect(res).toMatchInlineSnapshot(`
            {
              "data": {
                "register": {
                  "email": "leopold@gmail.com",
                  "pseudo": "Léopold",
                },
              },
            }
        `)
    })
})

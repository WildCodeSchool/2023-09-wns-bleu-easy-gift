import { User } from '../src/entities/user'
import getUsers from './operations/getUsers'
import { execute } from '../jest.setup'
import register from './operations/register'

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
        expect(res).toMatchInlineSnapshot(`
            {
              "data": {
                "users": [
                  {
                    "email": "john@gmail.com",
                    "id": 1,
                    "pseudo": "John",
                  },
                  {
                    "email": "jane@gmail.com",
                    "id": 2,
                    "pseudo": "Jane",
                  },
                ],
              },
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

import { User } from '../src/entities/user'
import getUsers from './operations/getUsers'
import { execute } from '../jest.setup'

describe('user resolver', () => {
    it('should return the users', async () => {
        await User.create({ firstName: 'John' }).save()
        await User.create({ firstName: 'Jane' }).save()
        const res = await execute(getUsers)
        expect(res).toMatchInlineSnapshot(`
            {
              "data": {
                "users": [
                  {
                    "firstName": "John",
                    "id": 1,
                  },
                  {
                    "firstName": "Jane",
                    "id": 2,
                  },
                ],
              },
            }
        `)

        // expect(1 + 2).toBe(3)
    })
})

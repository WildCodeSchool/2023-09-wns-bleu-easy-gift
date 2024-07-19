import { fakerFR as faker } from '@faker-js/faker'
import { User } from '../entities/user'
import { Avatar } from '../entities/avatar'

const generateFakeUser = () => {
    const sex = faker.person.sexType()
    const pseudo = faker.person.firstName(sex)
    const email = faker.internet.email({ firstName: pseudo })
    return {
        email,
        pseudo,
        password: 'test@1234',
        avatar: faker.number.int({ min: 1, max: 38 }),
    }
}
export const usersFactory = async (length: number) => {
    const userPromises = Array.from({ length: length }).map(async () => {
        const fakeUser = generateFakeUser()
        const avatar = await Avatar.findOne({ where: { id: fakeUser.avatar } })
        if (!avatar) {
            console.error(`Avatar with ID ${fakeUser.avatar} not found`)
        }

        const user = await User.create({
            pseudo: fakeUser.pseudo,
            email: fakeUser.email,
            password: fakeUser.password,
            avatar: avatar,
        }).save()

        return user
    })
    const users = await Promise.all(userPromises)
    return users.filter(user => user !== null)
}

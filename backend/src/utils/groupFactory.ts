import { fakerFR as faker } from '@faker-js/faker'
import { User } from '../entities/user'
import { Group } from '../entities/group'
import { Avatar } from '../entities/avatar'
import { UserToGroup } from '../entities/userToGroup'
import { usersFactory } from './userFactory'
import { createGroupDiscussions } from '../resolvers/discussionsResolver'

export const groupFactory = async (user: User, numberOfGroupUser: number) => {
    //on récupère les avatars de type généric pour les groupes
    const groupAvatars = await Avatar.find({ where: { type: 'generic' } })
    const randomGroupAvatar =
        groupAvatars[Math.floor(Math.random() * groupAvatars.length)]

    const newGroup = await Group.create({
        name: faker.animal.type(),
        event_date: faker.date.future().toLocaleDateString(),
        avatar: randomGroupAvatar,
    }).save()

    await UserToGroup.create({
        group_id: newGroup.id,
        user_id: user.id,
        is_admin: true,
    }).save()

    //On creer X fakeUsers
    const groupUsers = await usersFactory(numberOfGroupUser)

    for (const groupUser of groupUsers) {
        await UserToGroup.create({
            group_id: newGroup.id,
            user_id: groupUser.id,
            is_admin: false,
        }).save()
    }
    //on cree les discussions
    const allGroupUsers = [user, ...groupUsers]
    await createGroupDiscussions({
        groupUsers: allGroupUsers as User[],
        groupId: newGroup.id,
    })
    return newGroup
}

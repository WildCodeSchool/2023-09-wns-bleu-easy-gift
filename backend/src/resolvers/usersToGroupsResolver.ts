import { Resolver, Query, Arg } from 'type-graphql'
import { UserToGroup } from '../entities/userToGroup'


export async function getUsersByGroup(group_id: number) {

    const userIntoGroup = await UserToGroup.findBy({ group_id })

    return userIntoGroup;
}

@Resolver(UserToGroup)
class UsersToGroupsResolver {
    @Query(() => [UserToGroup])
    async usersToGroups() {
        return UserToGroup.find()
    }
}

export default UsersToGroupsResolver
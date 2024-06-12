import { Resolver, Query } from 'type-graphql'
import { UserToGroup } from '../entities/userToGroup'

@Resolver(UserToGroup)
class UsersToGroupsResolver {
    @Query(() => [UserToGroup])
    async usersToGroups() {
        return UserToGroup.find()
    }
}
export default UsersToGroupsResolver

import { Resolver, Query } from 'type-graphql'
import { Avatar } from './../entities/avatar'

@Resolver(Avatar)
class AvatarsResolver {
    @Query(() => [Avatar])
    async profilAvatars() {
        return await Avatar.find({
            where: { type: 'profil' },
        })
    }
    // for commit
}

export default AvatarsResolver

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

    @Query(() => [Avatar])
    async groupAvatars() {
        return await Avatar.find({
            where: { type: 'generic' },
        })
    }
}

export default AvatarsResolver

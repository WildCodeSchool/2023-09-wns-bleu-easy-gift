import { Query, Resolver } from 'type-graphql'
// import { Discussion, NewDiscussionInput } from '../entities/discussion'
import { Discussion } from '../entities/discussion'
import { User } from '../entities/user'
import { Group } from '../entities/group'
// import { Group } from '../entities/group'
import { GraphQLError } from 'graphql'

// async function createDiscussion(data: NewDiscussionInput) {
async function createDiscussion({
    name,
    groupId,
    participantUsers,
}: {
    name: string
    groupId: number
    participantUsers: User[]
}) {
    // const newDiscussion = new Discussion()
    // Object.assign(newDiscussion, data)

    // const { id } = await newDiscussion.save()
    // return Discussion.findOne({
    //     where: { id },
    //     relations: { users: true },
    // })

    // const group = await Group.findOneBy({ id: groupId })

    const newDiscussion = await Discussion.create({ name })

    const group = await Group.findOne({ where: { id: groupId } })

    if (!group) throw new GraphQLError(`Can't find group `)

    newDiscussion.group = group

    newDiscussion.users = participantUsers

    newDiscussion.save()
}

// async function createUserToDiscussion({}) {}

export async function createGroupDiscussions({
    groupUsers,
    groupId,
}: {
    groupUsers: User[]
    groupId: number
}) {
    groupUsers.forEach(currentUser => {
        // creer une discussion
        const participantUsers = groupUsers.filter(
            user => user.id !== currentUser.id,
        )

        createDiscussion({
            name: currentUser.pseudo,
            groupId,
            participantUsers,
        })

        // const data = {
        //     name: currentUser.pseudo,
        //     group: groupId,
        //     participantUsers,
        // }
        // createDiscussion(data)

        // participantsIds.forEach(user => {

        // })
    })
}

@Resolver(Discussion)
class DiscussionResolver {
    @Query(() => [Discussion])
    async getDiscusions() {
        // return Discussion.find()
        return await Discussion.find({
            relations: ['group', 'messages', 'users'],
        })
    }
}

export default DiscussionResolver

import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql'
import { GraphQLError } from 'graphql'

import { Group, NewGroupInput } from '../entities/group'
import { UserToGroup, NewGroupUserInput } from '../entities/userToGroup'
import { MyContext } from '..'

export async function findGroupByName(name: string) {
    return await Group.findOneBy({ name })
}

async function createGroup({ name }: NewGroupInput) {
    return await Group.create({ name }).save()
}

async function createUserToGroup({
    group_id,
    user_id,
    is_admin,
}: NewGroupUserInput) {
    return await UserToGroup.create({
        group_id,
        user_id,
        is_admin,
    }).save()
}

@Resolver(Group)
class GroupsResolver {
    @Query(() => [Group])
    async groups() {
        return Group.find()
    }
    @Authorized()
    @Mutation(() => Group)
    async createGroup(@Ctx() ctx: MyContext, @Arg('data') data: NewGroupInput) {
        const { name } = data
        const group = await findGroupByName(name)

        if (group) {
            throw new GraphQLError(
                `Group already exist, fait pas trop le malin.`,
            )
        }
        const newGroup = await createGroup({ name })
        if (!ctx.user) throw new GraphQLError("T'es pas la chef(fe) t'es un BZ")
        const NewUserToGroup = await createUserToGroup({
            group_id: newGroup.id,
            user_id: ctx.user?.id,
            is_admin: true,
        })

        return newGroup
    }

    // @Query(() => ResponseMessage)
    // async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
    //     const user = await findUserByEmail(infos.email)

    //     if (!user) {
    //         throw new GraphQLError(`User doesn't exist`)
    //     }

    //     const isPasswordValid = await argon2.verify(
    //         user.password,
    //         infos.password,
    //     )
    //     const responseMessage = new ResponseMessage()
    //     if (isPasswordValid) {
    //         const token = await new SignJWT({ email: user.email })
    //             .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
    //             .setExpirationTime('2h')
    //             .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`))

    //         const cookies = new Cookies(ctx.req, ctx.res)
    //         cookies.set('token', token, { httpOnly: true })

    //         responseMessage.message = 'Bienvenue!'
    //         responseMessage.success = true
    //     } else {
    //         responseMessage.message = 'Vérifiez vos informations'
    //         responseMessage.success = false
    //     }

    //     return responseMessage
    // }

    // @Authorized()
    // @Query(() => ResponseMessage)
    // async testAuthorized() {
    //     const responseMessage = new ResponseMessage()
    //     responseMessage.message = 'Tu es arrive a cette query'
    //     responseMessage.success = true
    //     return responseMessage
    // }

    // @Query(() => UserInfos)
    // async getUserInfos(@Ctx() ctx: MyContext) {
    //     if (!ctx.user) {
    //         throw new GraphQLError("No JWT, t'es crazy (gift)")
    //     }
    //     const userData = await User.findOneBy({ email: ctx.user.email })

    //     if (!userData) throw new GraphQLError('Cannot find user')

    //     return {
    //         id: userData.id,
    //         pseudo: userData.pseudo,
    //         email: userData.email,
    //     }
    // }

    // @Query(() => ResponseMessage)
    // async logout(@Ctx() ctx: MyContext) {
    //     if (ctx.user) {
    //         const cookies = new Cookies(ctx.req, ctx.res)
    //         cookies.set('token')
    //     }
    //     const responseMessage = new ResponseMessage()

    //     responseMessage.message = 'Vous avez été déconnecté'
    //     responseMessage.success = true

    //     return responseMessage
    // }
}

export default GroupsResolver

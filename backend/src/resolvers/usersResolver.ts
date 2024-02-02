import { Resolver, Query, Arg, Mutation, Int } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { validate } from 'class-validator'
import { User, NewUserInput } from '../entities/user'

@Resolver(User)
class UsersResolver {
    @Query(() => [User])
    async users() {
        return User.find()
    }

    // @Query(() => Ad)
    // async getAdById(@Arg("adId", () => Int) id: number) {
    //   const ad = await Ad.findOne({
    //     where: { id },
    //     relations: { category: true, tags: true },
    //   });
    //   if (!ad) throw new GraphQLError("not found");
    //   return ad;
    // }

    @Mutation(() => User)
    async createUser(@Arg('data', { validate: true }) data: NewUserInput) {
        const newUser = new User()
        Object.assign(newUser, data)
        const errors = await validate(newUser)
        if (errors.length !== 0)
            throw new GraphQLError('invalid data', { extensions: { errors } })
        const { id } = await newUser.save()
        return User.findOne({
            where: { id },
        })
    }

    // @Mutation(() => Ad)
    // async updateAd(
    //   @Arg("adId") id: number,
    //   @Arg("data", { validate: true }) data: UpdateAdInput
    // ) {
    //   const adToUpdate = await Ad.findOneBy({ id });
    //   if (!adToUpdate) throw new GraphQLError("not found");

    //   await Object.assign(adToUpdate, data);

    //   await adToUpdate.save();
    //   return Ad.findOne({
    //     where: { id },
    //     relations: { category: true, tags: true },
    //   });
    // }

    // @Mutation(() => String)
    // async deleteAd(@Arg("adId") id: number) {
    //   const ad = await Ad.findOne({ where: { id } });
    //   if (!ad) throw new GraphQLError("not found");
    //   await ad.remove();
    //   return "deleted";
    // }
}

export default UsersResolver

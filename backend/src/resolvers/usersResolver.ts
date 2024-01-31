import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { Ad, NewAdInput, UpdateAdInput } from "../entities/ad";
import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { In, Like } from "typeorm";
import { User } from "../entities/user";

@Resolver(User)
class UsersResolver {
  @Query(() => [User])
  async users() {
    return User.find();
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

  // @Mutation(() => Ad)
  // async createAd(@Arg("data", { validate: true }) data: NewAdInput) {
  //   const newAd = new Ad();
  //   Object.assign(newAd, data);
  //   const errors = await validate(newAd);
  //   if (errors.length !== 0)
  //     throw new GraphQLError("invalid data", { extensions: { errors } });
  //   const { id } = await newAd.save();
  //   return Ad.findOne({
  //     where: { id },
  //     relations: { category: true, tags: true },
  //   });
  // }

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

export default UsersResolver;

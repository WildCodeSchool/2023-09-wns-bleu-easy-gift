import { Resolver, Query, Ctx, Mutation } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { MyContext } from '..'
import { User } from '../entities/user'
import { Discussion } from '../entities/discussion'
import { Group } from '../entities/group';


/* class DiscussionService {
  async createDiscussionAtGroupCreation(@Ctx() ctx: MyContext, @Arg('infos pour chaque discussion') data: Discussion) {

  }
} */


async function createDiscussionAtGroupCreation() {
  // Récupérer les users associés au groupe

  // récupérer les emails des users concernés
  // récupérer l'email du user connecté,



  // crée les dicussions pour chaque user concerné(user des emails)
  // boucler

}



@Resolver(Discussion)
class DiscussionResolver {




}

/* @Resolver(Discussion)
class DiscussionResolver {

  @Query(() => [Discussion])
  async Discussions(@Ctx() ctx: MyContext): Promise<Discussion[]> {

    if (!ctx.user) throw new GraphQLError(`Authentifie toi pour accéder à tes discussions`),

    const discussions = await Discussion.createQueryBuilder('discussion')
      .leftJoinAndSelect('discussion.users', 'user')
      .where('user.id != :userId', { userId: ctx.user.id })
      .getMany()



    return discussions
  }
}

export default DiscussionResolver
 */

// @Mutation(() => Discussion)
// async addNewDiscussionForEachUser(@Ctx() ctx: MyContext, @Arg('infos pour chaque discussion') data: Discussion)

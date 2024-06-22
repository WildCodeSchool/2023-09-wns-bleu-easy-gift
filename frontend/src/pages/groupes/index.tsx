import { Button } from "@/components/ui/button";
import { useUserGroupsQuery } from "../../graphql/generated/schema";
import GroupCard from "@/components/GroupCard";

export default function Profile() {
  const { data, loading, error } = useUserGroupsQuery({fetchPolicy: 'cache-and-network'});
  const today = new Date().toLocaleDateString();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Erreur : {error.message}</h1>;

  return (
    <>
      <section className="flex flex-col gap-6 pb-6 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]">
        <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue">
          Mes groupes
        </h2>
        {data?.userGroups?.length === 0 ? (
          <div className="flex flex-col items-center mt-6">
            <p className="text-md  mb-3 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 2xl:text-xl">
              Crée ton premier groupe et invite tes amis !
            </p>
            <Button>
              <a type="button" href="/creating-groups">
                Créer un groupe
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className={'flex justify-between items-center'}>
              <p className="text-md 2xl:text-xl">
                Accède à tes groupes Easy Gift.
              </p>
              <Button>
                <a type="button" href="/creating-groups">
                  Ajouter un groupe
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {data?.userGroups?.map((group) => (
                  new Date(group.event_date).toLocaleDateString() > today &&
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { useUserGroupsQuery } from "../../graphql/generated/schema";
import GroupCard from "@/components/GroupCard";
import { useState } from "react";

export default function Profile() {
  const { data, loading, error } = useUserGroupsQuery({
    fetchPolicy: "cache-and-network",
  });
  const today = new Date();
  const [allGroups, setAllGroups] = useState(false);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Erreur : {error.message}</h1>;

  function handleAllGroups() {
    setAllGroups(!allGroups);
  }

  return (
    <section className="flex flex-col gap-6 pb-6 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]">
      <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue">
        Mes groupes {data?.userGroups ? `(${data.userGroups.length})` : "(0)"}
      </h2>
      {data?.userGroups?.length === 0 ? (
        <div className="flex flex-col items-center mt-6">
          <p className="text-md mb-3 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 2xl:text-xl">Crée ton premier groupe et invite tes amis !</p>
          <Button>
            <a type="button" href="/creating-groups">
              Créer un groupe
            </a>
          </Button>
        </div>
      ) : (
        <>
          <div className={"flex justify-between items-center"}>
            <p className="text-md 2xl:text-xl">Accède à tes groupes Easy Gift.</p>
            <Button>
              <a type="button" href="/creating-groups">
                Ajouter un groupe
              </a>
            </Button>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" onClick={handleAllGroups} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tous les groupes</span>
          </label>
          <div
            className={`flex flex-wrap gap-6 justify-center lg:justify-evenly ${
              data?.userGroups?.length && data.userGroups.length > 2 ? "justify-between" : "xl:justify-evenly"
            }`}
          >
            {data?.userGroups &&
              data.userGroups.map((group) => {
                if (!group.event_date) {
                  return null;
                }
                const eventDate = new Date(group.event_date);
                if (!allGroups && eventDate < today) {
                  return null;
                }
                return <GroupCard key={group.id} group={group} link={`/group/${group.id}`} />;
              })}
          </div>
        </>
      )}
    </section>
  );
}

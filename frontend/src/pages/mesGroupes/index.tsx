import { useUserGroupsQuery } from "../../graphql/generated/schema";
import GroupCard from "@/components/GroupCard";

export default function Profile() {
  const { data, loading, error } = useUserGroupsQuery();

  console.log(data);

  // if (groupsLoading || userLoading) return <h1>Loading...</h1>;
  // if (groupsError) return <h1>Error: {groupsError.message}</h1>;
  // if (userError) return <h1>Error: {userError.message}</h1>;

  return (
    <>
      {/* <section className="mb-10 h-auto flex-col flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-10/12  2xl:mb-40 md:max-w-2xl lg:max-w-4xl xl:max-w-[900px]"> */}
      <section className="mb-16 min-h-40 h-auto flex flex-initial flex-col content-start items-center my-0 mx-auto w-4/5 md:mt-10 md:mb-28 md:min-h-80 md:justify-evenly md:max-w-2xl lg:flex-nowrap lg:mb-44 lg:max-w-7xl xl:mb-20 xl:min-h-120  2xl:max-w-[1800px] 2xl:min-h-150 2xl:content-center 2xl:mb-40">
        <h2 className="text-2xl md:mb-3 md:text-4xl font-bold text-primaryBlue">
          Mes groupes
        </h2>
        <p className="mb-9 text-lg text-justify md:mb-10 md:text-xl">
          Accède à tes groupes Easy Gift.
        </p>
        <div className="flex flex-wrap gap-10 justify-center">
          {data?.userGroups?.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>
    </>
  );
}

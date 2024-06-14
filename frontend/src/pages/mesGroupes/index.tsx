import { useUserGroupsQuery } from "../../graphql/generated/schema";
import MyGroup from "@/components/MyGroup";

export default function Profile() {
  const { data, loading, error } = useUserGroupsQuery();

  console.log(data);

  // if (groupsLoading || userLoading) return <h1>Loading...</h1>;
  // if (groupsError) return <h1>Error: {groupsError.message}</h1>;
  // if (userError) return <h1>Error: {userError.message}</h1>;

  return (
    <>
      {/* <section className="mb-10 h-auto flex-col flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-10/12  2xl:mb-40 md:max-w-2xl lg:max-w-4xl xl:max-w-[900px]"> */}
      <section className="flex flex-col justify-center mb-10 max-w-screen-2xl">
        <h2 className="text-2xl md:mb-3 md:text-4xl font-bold text-primaryBlue">
          Mes groupes
        </h2>
        <p className="mb-9 text-lg text-justify md:mb-10 md:text-xl">
          Accède à tes groupes Easy Gift.
        </p>
        <div className="flex flex-wrap gap-10 item-center">
          {data?.userGroups?.map((group) => (
            <MyGroup key={group.id} group={group} />
          ))}
        </div>
      </section>
    </>
  );
}

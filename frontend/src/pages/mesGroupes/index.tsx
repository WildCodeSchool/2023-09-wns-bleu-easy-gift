import { useUserGroupsQuery } from "../../graphql/generated/schema";
import GroupCard from "@/components/GroupCard";
import MyGroups from "@/components/MyGroups";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Profile() {
  const { data, loading, error } = useUserGroupsQuery();

  console.log(data);

  // if (groupsLoading || userLoading) return <h1>Loading...</h1>;
  // if (groupsError) return <h1>Error: {groupsError.message}</h1>;
  // if (userError) return <h1>Error: {userError.message}</h1>;

  return (
    <>
      <section className="mb-10 h-auto flex-col flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-10/12  2xl:mb-40 md:max-w-2xl lg:max-w-4xl xl:max-w-[900px]">
        <h2 className="mb-8 mt-10 text-2xl md:mb-3 md:text-4xl font-bold text-primaryBlue">
          Mes groupes
        </h2>
        <p className="mb-9 text-lg text-justify md:mb-10 md:text-xl">
          Accède à tes groupes Easy Gift.
        </p>
        <ul>
          <MyGroups />
          {data?.userGroups.map((group) => (
            <>
              <Card>
                <CardHeader className="flex" key={group.id}>
                  <CardTitle> Groupe {group.name}</CardTitle>
                  <CardDescription>
                    <img
                      src={group.avatar.url}
                      className="w-32 h-32"
                      alt="Avatar for the group"
                    />
                  </CardDescription>
                </CardHeader>
              </Card>
            </>
          ))}
        </ul>
      </section>
    </>
  );
}

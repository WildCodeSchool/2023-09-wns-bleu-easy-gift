import { useUserGroupsQuery, useGetUserInfosQuery } from "../../graphql/generated/schema";

export default function Profile() {
  const { data: groupsData, loading: groupsLoading, error: groupsError } = useUserGroupsQuery();

  const { data: userData, loading: userLoading, error: userError } = useGetUserInfosQuery();

  const user = userData?.getUserInfos;
  const groups = groupsData?.userGroups;

  console.log("groups", groups);
  console.log("user", user);
  if (!groupsData) return <h1>Loading...</h1>;
  if (groupsError) return <h1>Error: {groupsError.message}</h1>;

  return (
    <>
      <h1>Mon profil</h1>
      <h2>Informations personnelles</h2>
      <p>Pseudo: {user?.pseudo}</p>
      <p>Email: {user?.email}</p>
      <h2>Mes groupes</h2>
      <ul>
        {groups?.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </>
  );
}

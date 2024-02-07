import { UsersQuery, useUsersQuery } from "@/graphql/generated/schema";

export default function ShowUsersList({
  users,
}: {
  users: {
    __typename?: "User" | undefined;
    id: number;
    firstName: string;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-green-700">Liste des utilisateurs</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.id} {user.firstName}
        </div>
      ))}
    </div>
  );
}
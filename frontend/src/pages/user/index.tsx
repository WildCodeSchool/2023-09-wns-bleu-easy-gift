import React from "react";
import { useUsersQuery } from "@/graphql/generated/schema";

export default function UserList() {
  const { loading, data, error } = useUsersQuery();

  const users = data?.users || [];

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

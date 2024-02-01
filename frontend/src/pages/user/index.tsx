import React from "react";
import { useUsersQuery } from "@/graphql/generated/schema";

export type User = {
  id: number;
  firstName: string;
};

export default function UserList() {
  const { loading, data, error } = useUsersQuery();

  const users = data?.users || [];

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {users.map((user) => (
        <div>
          {user.id}
          {user.firstName}
        </div>
      ))}
    </div>
  );
}

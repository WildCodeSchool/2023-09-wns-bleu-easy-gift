import React from "react";
import { useUsersQuery } from "@/graphql/generated/schema";

export default function UserList() {
  const { loading, data, error } = useUsersQuery();

  const users = data?.users || [];

  return (
    <>
      <h2>Liste des utilisateurs</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.id} {user.firstName}
        </div>
      ))}
    </>
  );
}

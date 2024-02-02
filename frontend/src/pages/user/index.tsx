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

      <thead>
        <tr>
          <th scope="col">Id Number</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.firstName}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

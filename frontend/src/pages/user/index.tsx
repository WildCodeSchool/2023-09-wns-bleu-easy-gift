import React from "react";
import { useUsersQuery } from "@/graphql/generated/schema";

export default function Users() {
  const { loading, data, error } = useUsersQuery();

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data?.users || [];

  return (
    <div className="">
      <h2 className="">Liste des utilisateurs</h2>
      {/* Render your users here */}
    </div>
  );
}

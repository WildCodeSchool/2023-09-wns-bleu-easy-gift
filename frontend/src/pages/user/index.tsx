import React from "react";
import { useUsersQuery } from "@/graphql/generated/schema";
import ShowUsersList from "@/components/ShowUsersList";

export default function UserList() {
  const { loading, data, error } = useUsersQuery();

  const users = data?.users || [];
  return <ShowUsersList users={users} />;
}

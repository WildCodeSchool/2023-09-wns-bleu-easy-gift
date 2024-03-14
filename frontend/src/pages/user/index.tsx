import React from "react";
import { UserInfos, useUsersQuery } from "@/graphql/generated/schema";
import ShowUsersList from "@/components/ShowUsersList";

export default function UserList() {
  const { loading, data, error } = useUsersQuery({
    fetchPolicy: "cache-and-network",
  });

  const users = data?.users || [];

  return <ShowUsersList users={users} />;
}

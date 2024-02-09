import React from "react";
import { Button } from "./ui/button";
import { useLogoutLazyQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  const [logout] = useLogoutLazyQuery({
    onCompleted: () => {
      router.push("/");
    },
  });
  return (
    <Button variant={"destructive"} onClick={() => logout()}>
      Se Deconnecter
    </Button>
  );
}

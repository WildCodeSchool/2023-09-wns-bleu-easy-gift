import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";


interface Avatar {
  __typename?: "Avatar";
  id: number;
  name: string;
  url: string;
}

interface User {
  __typename?: "User";
  id: number;
  pseudo: string;
  avatar: Avatar;
}

interface UserToGroup {
  __typename?: "UserToGroup";
  user: User;
}

interface Group {
  __typename?: "Group";
  id: number;
  name: string;
  avatar: Avatar;
  userToGroups: UserToGroup[];
}
interface GroupComponentProps {
  group: Group;
}
export default function MyGroup({ group }: GroupComponentProps) {
  const [showAll, setShowAll] = useState(false);
  const handleToggle = () => {
    setShowAll(!showAll);
  };
  const displayedUsers = showAll
    ? group.userToGroups
    : group.userToGroups.slice(0, 7);

  return (
    <Card className="w-80 hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400 justify-between">
      <CardHeader className="bg-white shadow-sm h-350 rounded-t-lg pb-4">
        <img
          src={group.avatar.url}
          alt={group.avatar.name}
          className="w-full h-full object-cover rounded-t-lg mb-3"
        />
        <CardTitle className="font-bold text-xl">{group.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-evenly pt-3" onClick={handleToggle}>
        <div>Membres du groupe</div>
        <div
          className={`flex justify-center`}
        >
          {/*<div className="flex -space-x-3">*/}
            <div className={`flex ${
                displayedUsers.length>7 ? "flex-wrap gap-2" : " -space-x-3"
            }`}>
            {displayedUsers.map((user) => (
                <div className="group cursor-pointer relative">
                  <img
                  key={user.user.id}
                  src={user.user.avatar.url}
                  className="w-10 h-10 rounded-full border-solid border-2 border-primaryRed transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300"
                  alt="Avatar of the user"
                  title={user.user.pseudo}
                  />
                  <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                    {user.user.pseudo}
                  <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" ><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                  </div>
                </div>
            ))}
            {(!showAll && group.userToGroups.length>7) && (
            <a className="flex z-10 items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">+{group.userToGroups.length-7}</a>
            )}
          </div>
        </div>
          <div className="flex justify-end">
            <Button className="shadow-md">
              <Link href="/">Consulter</Link>
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}

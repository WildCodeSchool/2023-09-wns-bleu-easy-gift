import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const handleToggle = () => {
    setShowAll(!showAll);
  };
  const displayedUsers = showAll
    ? group.userToGroups
    : group.userToGroups.slice(0, 4);

  return (
    <Card className="w-80 shadow-lg hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400 justify-between">
      <CardHeader className="bg-white shadow-sm h-350 rounded-t-lg">
        <img
          src={group.avatar.url}
          alt={group.avatar.name}
          className="w-full h-full object-cover rounded-t-lg mb-4"
        />
        <CardTitle className="font-bold text-xl mb-2">{group.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>Membres du groupe ({group.userToGroups.length})</div>
        <div
          className={`flex ${
            displayedUsers.length > 4 ? "place-items-end" : "items-center"
          }`}
        >
          <div
            className="flex flex-wrap w-full overflow-hidden gap-4"
            onClick={handleToggle}
          >
            {displayedUsers.map((user) => (
              <img
                key={user.user.id}
                src={user.user.avatar.url}
                className="w-10 h-10 rounded-full border-solid border-4 border-primaryRed "
                alt="Avatar of the user"
                title={user.user.pseudo}
              />
            ))}
          </div>
          <div>
            <div
              role="button"
              id="Accéder au groupe"
              onClick={() => router.push("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-arrow-right-square-fill text-primaryBlue"
                viewBox="0 0 16 16"
              >
                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

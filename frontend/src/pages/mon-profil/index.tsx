import ModalModifyAvatar from "@/components/profil/modalModifyAvatar";
import { useUserGroupsQuery, useGetUserInfosQuery } from "../../graphql/generated/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Profile() {
  const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false);
  const { data: groupsData, loading: groupsLoading, error: groupsError } = useUserGroupsQuery();
  const { data: userData, loading: userLoading, error: userError } = useGetUserInfosQuery();

  const user = userData?.getUserInfos;
  const groups = groupsData?.userGroups;
  const avatarId = user?.avatar?.id;

  if (!groupsData) return <h1>Loading...</h1>;
  if (groupsError) return <h1>Error: {groupsError.message}</h1>;

  return (
    <>
      <section className="mb-40 h-auto flex-col flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-10/12  md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-[900px]">
        <div>
          <h2 className="mb-8 text-2xl md:mb-3 md:text-4xl font-bold text-primaryBlue">Informations personnelles</h2>
          <p className="mb-9 text-lg text-left md:mb-10 md:text-xl">Gère les informations de ton compte Easy Gift.</p>
          <div className="mb-7 flex justify-end">
            <div className="relative w-32 h-32" onClick={() => setIsModalAvatarOpen(!isModalAvatarOpen)}>
              <img
                src={user?.avatar?.url}
                className="absolute inset-0 w-24 h-24 2xl:w-32 2xl:h-32 mb-5 rounded-full mr-2 border-solid border-4 border-primaryRed"
                alt="Avatar of the user"
              />
              <div className="absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75">
                Modifier
              </div>
            </div>
          </div>

          <div className="grid-cols-2">
            <div className="flex items-center h-14">
              <p className="text-base font-semibold w-32">Pseudo</p>
              <p className="text-base">{user?.pseudo}</p>
            </div>
            <Separator />
            <div className="flex items-center h-14">
              <p className="text-base font-semibold w-32">Email</p>
              <p className="text-base">{user?.email}</p>
            </div>
            <Separator />
            <div className="flex items-center h-14">
              <p className="text-base font-semibold w-32">Mot de passe</p>
              <a href="/" className="text-primaryBlue">
                Modifier
              </a>
            </div>
            <Button className="mt-10">Modifier mes informations</Button>
          </div>
        </div>

        {/* <h2 className="mb-8 mt-10 text-2xl md:mb-3 md:text-4xl font-bold text-primaryBlue">Mes groupes</h2>
        <p className="mb-9 text-lg text-justify md:mb-10 md:text-xl">Accède à tes groupes Easy Gift.</p>
        <ul>
          {groups?.map((group) => (
            <>
              <div key={group.id}>
                <p>{group.name}</p>
                <img src={group.avatar.url} className="w-32 h-32" alt="Avatar for the group" />
              </div>
            </>
          ))}
        </ul> */}
      </section>

      {isModalAvatarOpen && (
        <ModalModifyAvatar isOpen={isModalAvatarOpen} handleClose={() => setIsModalAvatarOpen(!isModalAvatarOpen)} avatarId={avatarId} />
      )}
    </>
  );
}

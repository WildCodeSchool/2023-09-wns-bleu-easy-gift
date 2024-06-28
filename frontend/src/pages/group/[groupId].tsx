// import Layout from "@/components/Layout";
import {useRouter} from "next/router";
// import { UserCircleIcon } from "@heroicons/react/outline";
// import { LocationMarkerIcon } from "@heroicons/react/outline";
// import { PencilIcon } from "@heroicons/react/outline";
// import { TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {
    useGetGroupByIdQuery,
} from "@/graphql/generated/schema";
import {Button} from "@/components/ui/button";
import GroupCard from "@/components/GroupCard";
import {Separator} from "@/components/ui/separator";
import React from "react";

export default function GroupDetails() {
    const router = useRouter();
    // const [deleteAd] = useDeleteAdMutation();
    const {groupId} = router.query;
    const {data, loading, error} = useGetGroupByIdQuery({
        variables: {groupId: typeof groupId === "string" ? parseInt(groupId, 10) : 0},
        skip: typeof groupId === "undefined",
    });

    const group = data?.getGroupById;
    console.log(group)
    //
    // const { data: currentUser } = useProfileQuery();
    //
    // const canEdit =
    //     currentUser?.profile.role === "admin" ||
    //     currentUser?.profile.id === ad?.owner.id;
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Erreur : {error.message}</h1>;

    return (
        <div>
            <div className="flex flex-col justify-between align-center text-left mb-5">
                <div
                    className="flex flex-col gap-3 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]">
                    <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue">
                        Group ({group?.name})
                    </h2>
                    <p className="text-md 2xl:text-xl">
                        Gère les informations de ton groupe Easy Gift.
                    </p>
                    <div className="bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl">
                        <div
                            className="flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between">
                            <div className="shrink sm:w-1/2 sm:max-w-lg">
                                <div>

                                    <div className="text-2xl font-medium">
                                        Avatar du groupe
                                    </div>
                                    <div className="text-sm text-black/60">
                                        Ceci est votre avatar
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div
                                    className="relative w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32"
                                >
                                    <img
                                        src={group?.avatar?.url}
                                        className="absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full mr-2 border-solid border-4 border-primaryRed"
                                        alt="Avatar of the user"
                                    />
                                    <div
                                        className="absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75">
                                        Modifier
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl">
                        <div
                            className="flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between">
                            <div className="shrink sm:w-1/2 sm:max-w-lg">
                                <div>
                                    <div className="text-2xl font-medium">
                                        Informations du groupe
                                    </div>
                                    <div className="text-sm text-black/60">
                                        Voici les informations de votre groupe
                                    </div>
                                </div>
                            </div>
                            <div className="shrink sm:w-1/2 sm:max-w-lg">

                                <div className="grid-cols-2">
                                    <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">
                                        <p className="text-base font-semibold w-32">Nom</p>
                                        <p className="text-base">{group?.name}</p>
                                    </div>
                                    <Separator/>
                                    <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">
                                        <p className="text-base font-semibold w-32">Créer le</p>
                                        {/*<p className="text-base">{createdAt}</p>*/}
                                    </div>
                                    <Separator/>
                                    <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">
                                        <p className="text-base font-semibold w-32">Date de l'évenement</p>
                                        <p className="text-base">{group?.event_date}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl">
                        <div
                            className="flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between">
                            <div className="shrink sm:w-1/2 sm:max-w-lg">
                                <div>
                                    <div className="text-2xl font-medium">
                                        Membres du groups
                                    </div>
                                    <div className="text-sm text-black/60">
                                        Voici la liste des membre de votre groupe
                                    </div>
                                </div>
                            </div>
                            <div className="shrink sm:w-1/2 sm:max-w-lg">

                                {group?.userToGroups.map((group) => {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <div className="hidden small:block">
                                                {group.user.pseudo}
                                            </div>
                                            <div>
                                                <div>
                                                    <div className="group cursor-pointer relative">
                                                        <img
                                                            src={group.user.avatar?.url}
                                                            className="w-10 h-10 rounded-full border-solid border-2 border-primaryRed transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300"
                                                            alt="Avatar of the user"
                                                            title={group.user.pseudo}
                                                        />
                                                        <div
                                                            className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                                                            {group.user.pseudo}
                                                            <svg className="absolute text-black h-2 w-full left-0 top-full"
                                                                 x="0px"
                                                                 y="0px" viewBox="0 0 255 255">
                                                                <polygon className="fill-current"
                                                                         points="0,0 127.5,127.5 255,0"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/*<section*/}
            {/*    className="flex flex-col gap-6 pb-6 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]">*/}
            {/*    /!*<h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue">*!/*/}
            {/*    /!*    Group ({group?.name})*!/*/}
            {/*    /!*</h2>*!/*/}
            {/*    /!*<p className="text-md 2xl:text-xl">*!/*/}
            {/*    /!*    Gère les informations de ton groupe Easy Gift.*!/*/}
            {/*    /!*</p>*!/*/}
            {/*    /!*<div className="mb-3 2xl:mb-7 flex justify-end">*!/*/}
            {/*    /!*    <div*!/*/}
            {/*    /!*        className="relative w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32"*!/*/}
            {/*    /!*    >*!/*/}
            {/*    /!*        <img*!/*/}
            {/*    /!*            src={group?.avatar?.url}*!/*/}
            {/*    /!*            className="absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full mr-2 border-solid border-4 border-primaryRed"*!/*/}
            {/*    /!*            alt="Avatar of the user"*!/*/}
            {/*    /!*        />*!/*/}
            {/*    /!*        <div*!/*/}
            {/*    /!*            className="absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75">*!/*/}
            {/*    /!*            Modifier*!/*/}
            {/*    /!*        </div>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <Separator/>*/}
            {/*    <div className="grid-cols-2">*/}
            {/*        <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">*/}
            {/*            <p className="text-base font-semibold w-32">Nom</p>*/}
            {/*            <p className="text-base">{group?.name}</p>*/}
            {/*        </div>*/}
            {/*        <Separator/>*/}
            {/*        <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">*/}
            {/*            <p className="text-base font-semibold w-32">Créer le</p>*/}
            {/*            /!*<p className="text-base">{createdAt}</p>*!/*/}
            {/*        </div>*/}
            {/*        <Separator/>*/}
            {/*        <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">*/}
            {/*            <p className="text-base font-semibold w-32">Date de l'évenement</p>*/}
            {/*            <p className="text-base">{group?.event_date}</p>*/}
            {/*        </div>*/}
            {/*        <Separator/>*/}
            {/*        <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">*/}
            {/*            <p className="text-base font-semibold w-32">Membres du groupe</p>*/}
            {/*            {group?.userToGroups.map((group) => {*/}
            {/*                return (*/}
            {/*                    <div className="flex items-center gap-2">*/}
            {/*                        <div className="hidden small:block">*/}
            {/*                            {group.user.pseudo}*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <div>*/}
            {/*                                <div className="group cursor-pointer relative">*/}
            {/*                                    <img*/}
            {/*                                        src={group.user.avatar?.url}*/}
            {/*                                        className="w-10 h-10 rounded-full border-solid border-2 border-primaryRed transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300"*/}
            {/*                                        alt="Avatar of the user"*/}
            {/*                                        title={group.user.pseudo}*/}
            {/*                                    />*/}
            {/*                                    <div*/}
            {/*                                        className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">*/}
            {/*                                        {group.user.pseudo}*/}
            {/*                                        <svg className="absolute text-black h-2 w-full left-0 top-full"*/}
            {/*                                             x="0px"*/}
            {/*                                             y="0px" viewBox="0 0 255 255">*/}
            {/*                                            <polygon className="fill-current"*/}
            {/*                                                     points="0,0 127.5,127.5 255,0"/>*/}
            {/*                                        </svg>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                )*/}
            {/*            })}*/}

            {/*        </div>*/}
            {/*        <Separator/>*/}
            {/*    </div>*/}

            {/*</section>*/}
        </div>
    );
}
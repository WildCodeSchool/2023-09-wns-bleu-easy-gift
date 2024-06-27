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
const createdAt = new Date(group?.created_at).toLocaleDateString() | null
    return (
        <section
            className="flex flex-col gap-6 pb-6 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]">
            <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue">
                Group ({group?.name})
            </h2>
            <p className="text-md 2xl:text-xl">
                Gère les informations de ton groupe Easy Gift.
            </p>
            <div className="grid-cols-2">
                <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">
                    <p className="text-base font-semibold w-32">Nom</p>
                    <p className="text-base">{group?.name}</p>
                </div>
                <div className="flex items-center h-9 md:h-11 lg:h-12 2xl:h-14">
                    <p className="text-base font-semibold w-32">Créer le</p>
                    <p className="text-base">{createdAt}</p>
                </div>
                <Separator/>
            </div>

        </section>
    );
}
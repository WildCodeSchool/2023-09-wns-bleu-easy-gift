import {UserToGroup} from "@/graphql/generated/schema";
import { Badge } from "@/components/ui/badge"


interface UserComponentProps {
    user: UserToGroup;
}
export default function ProfileCard({user}: UserComponentProps) {
    return (
        <div
            className="flex justify-between w-full border rounded-2xl transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300">
            <div className="flex m-3 lg:min-w-72 items-center gap-3 p-2 ">
                <img
                    src={user.user.avatar?.url}
                    className="w-10 h-10 rounded-full border-solid border-2 border-primaryRed"
                    alt="Avatar of the user"
                    title={user.user.pseudo}
                />
                <div>
                    <div className="flex justify-between">
                        <div className="font-bold">
                            {user.user.pseudo}
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {user.user.email}
                    </div>
                </div>
            </div>
            <div className="mt-2 mr-3">
            {(user.is_admin) && (
                <Badge variant="outline">Admin</Badge>
                )}
            </div>
        </div>
    );
}

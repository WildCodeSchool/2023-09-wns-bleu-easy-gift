import { UserToGroup } from '@/graphql/generated/schema'
import { Badge } from '@/components/ui/badge'

interface UserComponentProps {
    userToGroup: {
        is_admin: boolean
        user_id: number
        group_id: number
        user: {
            email: string
            pseudo: string
            avatar?: {
                id: number
                url: string
                name: string
            } | null
        }
    }
}

export default function ProfileCard({ userToGroup }: UserComponentProps) {
    return (
        <div className='flex justify-between w-full border rounded-2xl transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300'>
            <div className='flex m-3 lg:min-w-72 items-center gap-3 p-2 '>
                <img
                    src={userToGroup.user.avatar?.url}
                    className='w-10 h-10 rounded-full border-solid border-2 border-primaryRed'
                    alt={userToGroup.user.avatar?.name}
                    title={userToGroup.user?.pseudo}
                />
                <div>
                    <div className='flex justify-between'>
                        <div className='font-bold'>
                            {userToGroup.user.pseudo}
                        </div>
                    </div>
                    <div className='text-sm text-gray-500'>
                        {userToGroup.user.email}
                    </div>
                </div>
            </div>
            <div className='mt-2 mr-3'>
                {userToGroup.is_admin && <Badge variant='outline'>Admin</Badge>}
            </div>
        </div>
    )
}

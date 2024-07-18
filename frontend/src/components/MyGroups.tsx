import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/components/ui/card'
import { useRouter } from 'next/router'

interface Group {
    __typename?: 'Group'
    id: number
    name: string
    avatar: {
        __typename?: 'Avatar'
        id: number
        url: string
        name: string
    }
}

interface MyGroupsProps {
    isConnected: boolean
    groups: Group[] | undefined
    groupsLoading: boolean
    groupsError: any
}

function MyGroups({
    isConnected,
    groups,
    groupsLoading,
    groupsError,
}: MyGroupsProps) {
    const router = useRouter()

    if (!isConnected || groups?.length === 0) {
        return (
            <div className='flex flex-col sm:flex-col justify-center items-center gap-8 md:flex-row md:flex-wrap'>
                <Card className='w-80 shadow-lg hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400'>
                    <CardHeader
                        className='bg-white shadow-sm h-350
        rounded-t-lg
        '
                    >
                        <img
                            src='/images/avatar/group_bday7.png'
                            alt=''
                            className='w-full h-full object-cover rounded-t-lg mb-4'
                        />
                        <CardTitle className='font-bold text-2xl'>
                            Channiversaire
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=''></CardContent>
                </Card>
                <Card className='w-80 shadow-lg hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400'>
                    <CardHeader
                        className='bg-white shadow-sm h-350
        rounded-t-lg'
                    >
                        <img
                            src='/images/avatar/group_xmas4.png'
                            alt=''
                            className='w-full h-full object-cover rounded-t-lg mb-4'
                        />
                        <CardTitle className='font-bold text-xl mb-2'>
                            Secret Santa 2024
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=''></CardContent>
                </Card>
                <Card className='w-80 shadow-lg hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400'>
                    <CardHeader
                        className='bg-white shadow-sm h-350
        rounded-t-lg'
                    >
                        <img
                            src='/images/avatar/profil_ghibli2.png'
                            alt=''
                            className='w-full h-full object-cover rounded-t-lg mb-4'
                        />
                        <CardTitle className='font-bold text-xl mb-2'>
                            Cousinade
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=''></CardContent>
                </Card>
            </div>
        )
    }

    if (groupsLoading) {
        return <p>Loading...</p>
    }

    if (groups && groups?.length > 0) {
        return (
            <div className='flex flex-col sm:flex-col justify-center items-center gap-8 md:flex-row md:flex-wrap'>
                {groups.map(group => (
                    <Card className='w-80 shadow-lg hover:scale-105 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400'>
                        <CardHeader className='bg-white shadow-sm h-350 rounded-t-lg'>
                            <img
                                src={group.avatar.url}
                                alt={group.avatar.name}
                                className='w-full h-full object-cover rounded-t-lg mb-4'
                            />
                            <CardTitle className='font-bold text-xl mb-2'>
                                {group.name}
                            </CardTitle>
                        </CardHeader>
                        <div
                            className='flex justify-end align-middle m-5'
                            role='button'
                            id='Accéder au groupe'
                            onClick={() => router.push('/')}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='32'
                                height='32'
                                fill='currentColor'
                                className='bi bi-arrow-right-square-fill text-primaryBlue'
                                viewBox='0 0 16 16'
                            >
                                <path d='M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1' />
                            </svg>
                        </div>
                    </Card>
                ))}
            </div>
        )
    }
}

export default MyGroups

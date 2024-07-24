import { useGetDiscussionsByGroupIdWithoutCtxUserQuery } from '@/graphql/generated/schema'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

type MenuDiscussionsProps = {
    isMenuHidden: boolean
    toggleMenu: () => void
}

type DiscussionType = {
    __typename?: "Discussion" | undefined;
    id: number;
    userDiscussion: {
        __typename?: "User" | undefined;
        pseudo: string;
        id: number;
        avatar?: {
            __typename?: "Avatar" | undefined;
            url: string;
        } | null | undefined;
    };
};

const MenuDiscussions = ({
    isMenuHidden,
    toggleMenu,
}: MenuDiscussionsProps) => {
    const router = useRouter();
    const { groupId, search } = router.query;
    const [searchValue, setSearchValue] = useState<string>(search as string || '');

    const { data, loading, error } =
        useGetDiscussionsByGroupIdWithoutCtxUserQuery({
            variables: { groupId: Number(12) },
            fetchPolicy: 'cache-and-network',
        })
    const dataOnDiscussions = data?.getDiscussionsByGroupIdWithoutCtxUser

    let matchingDiscussions: any[] = [];
    let otherDiscussions: any[] = [];


    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {

        setSearchValue(e.target.value);

        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, search: searchValue },
            },
            undefined,
            { shallow: true }
        );
    }

    if (error) return <div>Oups, une erreur est survenue</div>;
    if (!data || !dataOnDiscussions) return <div>Groupe introuvable</div>;

    if (searchValue.length >= 2) {
        matchingDiscussions = dataOnDiscussions.discussions.filter(
            (discussion) => discussion.userDiscussion.pseudo.toLowerCase().includes(searchValue.toLowerCase())
        );

        otherDiscussions = dataOnDiscussions.discussions.filter(
            (discussion) => !discussion.userDiscussion.pseudo.toLowerCase().includes(searchValue.toLowerCase())
        );
    }


    return (
        <nav
            className={`bg-slate-200 w-full h-full pt-5 pb-6 flex flex-col justify-start transition-all duration-1000 ease-in-out ${isMenuHidden ? 'w-0 max-w-0 overflow-hidden -translate-x-full opacity-25' : 'w-full'
                } md:pb-6 md:max-w-screen-sm md:h-auto md:justify-between md:overflow-y-auto md:shadow-[-11px_6px_21px_3px_theme(colors.slate.500)] lg:justify-start ${isMenuHidden ? 'md:w-0 md:max-w-0' : 'md:w-5/12'
                }`}
        >
            <div className='w-4/5 mx-auto h-36 flex flex-shrink-0 flex-wrap justify-between items-center md:min-h-40 md:w-11/12 lg:w-4/5'>
                <div className='basis-5/6 flex justify-start items-center h-14'>
                    <img
                        src='/images/avatar/group_xmas8.png'
                        alt=''
                        className='w-16 h-16 inset-0 rounded-full mr-2 border-solid border-4 border-primaryBlue'
                    />
                    <h1
                        className='text-4xl md:text-2xl xl:text-4xl 2xl:text-5xl font-bold text-primaryBlue inline-block
                        ml-4 self-center'
                    >
                        {dataOnDiscussions?.groupName}
                    </h1>
                </div>
                <div className='self-end h-[3.5rem]'>
                    <button
                        type='button'
                        className='hidden md:block xl:hidden w-8 h-8 shadow-lg lg:duration-150 lg:hover:scale-125'
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            viewBox='0 0 16 16'
                            className='w-full h-full bg-white text-primaryBlue rounded-md'
                        >
                            <path d='M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1' />
                        </svg>
                    </button>
                </div>
                <div className='basis-full h-11 2xl:h-12 relative'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        className='relative z-10 top-[30px] left-[2px] ml-3 mt-3.5 text-slate-500'
                    >
                        <path d='M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
                        <path d='m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2' />
                    </svg>
                    <input
                        type='search'
                        className='w-full h-full rounded-3xl shadow-lg pl-9 outline-slate-200 outline-2 outline '
                        placeholder="Trouve la discussion de...."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <ul className='w-4/5 max-h-[68vh] min-h-0 overflow-y-auto mx-auto flex flex-col flex-grow flex-shrink justify-evenly max-w-96 mt-8 pt-3 md:h-auto md:min-h-auto md:max-h-none md:flex-grow md:justify-start'>
                {!searchValue && (
                    dataOnDiscussions.discussions.map((discussion, index) => (
                        <li
                            className={`w-full h-16 rounded-full ${index === 0
                                ? 'bg-red400 shadow-md border-red500 md:mb-12'
                                : 'bg-blue200 hover:border-primaryBlue'
                                } hover:border-2 pl-4 pr-6 py-2 mb-4 lg:transition lg:duration-500 lg:hover:shadow-lg lg:hover:shadow-slate-300`}
                            key={index}
                        >
                            <a
                                className='h-full flex items-center justify-start'
                                href={`/group/${groupId}/discussion/${discussion.userDiscussion.id}`}
                            >
                                <div className='relative mr-3 w-12 h-12'>
                                    <img
                                        src={discussion.userDiscussion?.avatar?.url}
                                        className={`absolute inset-0 w-12 h-12 rounded-full mr-2 border-solid border-4 ${index === 0
                                            ? 'border-red500'
                                            : 'border-primaryBlue'
                                            }`}
                                        alt='Avatar of the user'
                                    />
                                </div>
                                <div className='self-center flex flex-wrap w-3/4'>
                                    <h2
                                        className={`text-xl ${index === 0 ? 'text-white' : 'text-primaryBlue font-semibold'}`}
                                    >
                                        {discussion.userDiscussion.pseudo}
                                    </h2>
                                    {/* <p className={`truncate text-sm ${index === 0 ? "text-white" : "text-primaryBlue"} font-semibold w-min`}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p> */}
                                </div>
                            </a>
                        </li>
                    ))
                )
                }
                {searchValue && (
                    matchingDiscussions.map((discussion, index) => (
                        <li
                            className="w-full h-16 rounded-full bg-red400 shadow-md border-red500 md:mb-12
                                hover:border-2 pl-4 pr-6 py-2 mb-4 lg:transition lg:duration-500 lg:hover:shadow-lg lg:hover:shadow-slate-300"
                            key={index}
                        >
                            <a
                                className='h-full flex items-center justify-start'
                                href={`/group/${groupId}/discussion/${discussion.userDiscussion.id}`}
                            >
                                <div className='relative mr-3 w-12 h-12'>
                                    <img
                                        src={discussion.userDiscussion?.avatar?.url}
                                        className="absolute inset-0 w-12 h-12 rounded-full mr-2 border-solid border-4
                                            border-red500"

                                        alt='Avatar of the user'
                                    />
                                </div>
                                <div className='self-center flex flex-wrap w-3/4'>
                                    <h2
                                        className="text-xl text-white"
                                    >
                                        {discussion.userDiscussion.pseudo}
                                    </h2>
                                    {/* <p className={`truncate text-sm ${index === 0 ? "text-white" : "text-primaryBlue"} font-semibold w-min`}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </p> */}
                                </div>
                            </a>
                        </li>
                    ))
                )
                }
                {searchValue && (

                    otherDiscussions.map((discussion, index) => (
                        <li
                            className="w-full h-16 rounded-full bg-blue200 hover:border-primaryBlue
                                hover:border-2 pl-4 pr-6 py-2 mb-4 lg:transition lg:duration-500 lg:hover:shadow-lg lg:hover:shadow-slate-300"
                            key={index}
                        >
                            <a
                                className='h-full flex items-center justify-start'
                                href={`/group/${groupId}/discussion/${discussion.userDiscussion.id}`}
                            >
                                <div className='relative mr-3 w-12 h-12'>
                                    <img
                                        src={discussion.userDiscussion?.avatar?.url}
                                        className="absolute inset-0 w-12 h-12 rounded-full mr-2 border-solid border-4 border-primaryBlue"
                                        alt='Avatar of the user'
                                    />
                                </div>
                                <div className='self-center flex flex-wrap w-3/4'>
                                    <h2
                                        className="text-xl text-primaryBlue font-semibold"
                                    >
                                        {discussion.userDiscussion.pseudo}
                                    </h2>
                                    {/* <p className={`truncate text-sm ${index === 0 ? "text-white" : "text-primaryBlue"} font-semibold w-min`}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p> */}
                                </div>
                            </a>
                        </li>
                    ))
                )}
            </ul>

            <div className='w-4/5 mx-auto self-start flex flex-grow justify-end items-start shadow-[1px_-7px_8px_-8px_theme(colors.slate.400)] md:shadow-none md:max-h-20'>
                <div className='flex justify-end mt-4 lg:self-end'>
                    <img src='' alt='' />
                    <p className='text-2xl font-bold text-red400 cursor-pointer lg:transition lg:duration-150 lg:hover:scale-125 lg:hover:translate-x-[-15px] '>
                        Retour vers Mes groupes
                    </p>
                    <button
                        type='button'
                        className='ml-4 lg:duration-100 lg:hover:scale-125'
                        onClick={() => router.push('/groupes')}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-box-arrow-left text-red400 w-8 h-8'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fill-rule='evenodd'
                                d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z'
                            />
                            <path
                                fill-rule='evenodd'
                                d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                            />
                        </svg>
                    </button>
                </div>
                <div></div>
            </div>
        </nav>
    )
}

export default MenuDiscussions

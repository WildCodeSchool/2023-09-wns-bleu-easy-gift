import { useRouter } from 'next/router'
import { useGetGroupByIdQuery } from '@/graphql/generated/schema'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import ProfileCard from '@/components/ProfileCard'
import ModalUpdateGroup from '@/components/group/modalUpdateGroup'
import ModalAddMembers from '@/components/group/modalAddMembers'
import { Button } from '@/components/ui/button'
import { createPortal } from 'react-dom'
import ModalModifyAvatar from '@/components/profil/modalModifyAvatar'
import Head from 'next/head'
import { formatTimestamp } from '@/utils/date'

export default function GroupDetails() {
    const router = useRouter()
    const { groupId } = router.query
    const { data, loading, error } = useGetGroupByIdQuery({
        variables: {
            groupId: typeof groupId === 'string' ? parseInt(groupId, 10) : 0,
        },
        fetchPolicy: 'no-cache',
        skip: typeof groupId === 'undefined',
    })
    const [showModal, setShowModal] = useState(false)
    const [showModalAddMembers, setShowModalAddMembers] = useState(false)
    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false)

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Erreur : {error.message}</h1>

    const group = data?.getGroupById

    const eventDate =
        group && group.event_date ? new Date(group.event_date) : undefined

    return (
        <div>
            <Head>
                <title>Groupe {group?.name} - Easy Gift</title>
            </Head>
            <section className='w-full h-full flex-grow flex flex-col  gap-6 pb-6 my-10 justify-center items-center lg:min-h-screen lg:my-12 2xl:my-20'>
                <div className='flex flex-col gap-3 justify-between mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-primaryBlue lg:mb-8'>
                        Groupe {group?.name}
                    </h1>
                    <p className='text-md 2xl:text-xl'>
                        Gère les informations de ton groupe Easy Gift.
                    </p>
                    <div className='bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between'>
                            <div className='shrink sm:w-1/2 sm:max-w-lg'>
                                <div>
                                    <div className='text-2xl font-medium'>
                                        Avatar du groupe
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className='relative w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32'
                                    onClick={() =>
                                        setIsModalAvatarOpen(!isModalAvatarOpen)
                                    }
                                >
                                    <img
                                        src={group?.avatar?.url}
                                        className='absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full mr-2 border-solid border-4 border-primaryRed'
                                        alt={group?.avatar?.name}
                                    />
                                    <div className='absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75'>
                                        Modifier
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between'>
                            <div className='shrink sm:w-1/2 sm:max-w-lg'>
                                <div>
                                    <div className='text-2xl font-medium'>
                                        Informations du groupe
                                    </div>
                                    <div className='text-sm text-black/60'>
                                        Voici les informations de votre groupe
                                    </div>
                                </div>
                            </div>
                            <div className='shrink sm:w-1/2 sm:max-w-lg'>
                                <div className='grid-cols-2'>
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-44'>
                                            Nom
                                        </p>
                                        <p className='text-base'>
                                            {group?.name}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-44'>
                                            Créé le
                                        </p>
                                        <p className='text-base'>
                                            {formatTimestamp(group?.created_at)}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-44'>
                                            Date de l'évenement
                                        </p>
                                        {eventDate && (
                                            <p className='text-base'>
                                                {new Date(
                                                    eventDate
                                                ).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className='flex sm:justify-end'>
                                        <Button
                                            className='bg-primaryBlue text-white px-4 py-2 rounded mt-10'
                                            onClick={() => setShowModal(true)}
                                        >
                                            Modifier mes informations
                                        </Button>
                                        {showModal &&
                                            createPortal(
                                                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                                                    <ModalUpdateGroup
                                                        onClose={() =>
                                                            setShowModal(false)
                                                        }
                                                        group={group}
                                                    />
                                                </div>,
                                                document.body
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-8 items-center sm:items-start sm:flex-row sm:gap-16 sm:justify-between'>
                            <div className='shrink sm:w-1/2 sm:max-w-lg'>
                                <div>
                                    <div className='text-2xl font-medium'>
                                        Membres du groupe
                                    </div>
                                    <div className='text-sm text-black/60'>
                                        Voici la liste des membres de votre
                                        groupe
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 shrink items-center sm:w-1/2 sm:max-w-lg'>
                                {group?.userToGroups.map(userToGroup => {
                                    return (
                                        <ProfileCard
                                            key={userToGroup.user_id}
                                            userToGroup={userToGroup}
                                            discussions={group.discussions}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className='flex sm:justify-end'>
                            <Button
                                onClick={() => setShowModalAddMembers(true)}
                            >
                                Ajouter des membres au groupe
                            </Button>
                            {showModalAddMembers &&
                                createPortal(
                                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                                        <ModalAddMembers
                                            onClose={() =>
                                                setShowModalAddMembers(false)
                                            }
                                            group={group}
                                        />
                                    </div>,
                                    document.body
                                )}
                        </div>
                    </div>
                </div>
            </section>
            {isModalAvatarOpen && (
                <ModalModifyAvatar
                    isOpen={isModalAvatarOpen}
                    handleClose={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                    avatarId={group?.avatar.id}
                    type='group'
                    groupId={group?.id}
                />
            )}
        </div>
    )
}

import ModalModifyAvatar from '@/components/profil/modalModifyAvatar'
import ModalModifyDetails from '@/components/profil/modalModifyDetails'
import ModalModifyPassword from '@/components/profil/ModalModifyPassword'
import { useGetUserInfosQuery } from '../../graphql/generated/schema'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'

export default function Profile() {
    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false)
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)

    const {
        data: userData,
        loading: userLoading,
        error: userError,
    } = useGetUserInfosQuery()

    const user = userData?.getUserInfos
    const avatarId = user?.avatar?.id

    if (userLoading) return <h1>Loading...</h1>
    if (userError) {
        toast.error(userError.message)
        return <h1>Error: {userError.message}</h1>
    }

    return (
        <>
            <Head>
                <title>Mon profil - Easy Gift</title>
            </Head>
            <section className='mb-10 h-auto flex-col flex-initial flex-wrap justify-evenly items-center my-0 mx-auto w-10/12  2xl:mb-40 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
                <div>
                    <h1 className='mb-3 text-xl md:mb-3 lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                        Informations personnelles
                    </h1>
                    <p className='text-md text-left mb-3 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 2xl:text-xl'>
                        Gère les informations de ton compte Easy Gift.
                    </p>
                    <div className='mb-3 2xl:mb-7 flex justify-end'>
                        <div
                            className='relative w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32'
                            onClick={() =>
                                setIsModalAvatarOpen(!isModalAvatarOpen)
                            }
                        >
                            <img
                                src={user?.avatar?.url}
                                className='absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full mr-2 border-solid border-4 border-primaryRed'
                                alt='Avatar of the user'
                            />
                            <div className='absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75'>
                                Modifier
                            </div>
                        </div>
                    </div>

                    <div className='grid-cols-2'>
                        <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                            <p className='text-base font-semibold w-32'>
                                Pseudo
                            </p>
                            <p className='text-base'>{user?.pseudo}</p>
                        </div>
                        <Separator />
                        <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                            <p className='text-base font-semibold w-32'>
                                Email
                            </p>
                            <p className='text-base'>{user?.email}</p>
                        </div>
                        <Separator />
                        <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                            <p className='text-base font-semibold w-32'>
                                Mot de passe
                            </p>
                            <a
                                href='#'
                                className='text-primaryBlue'
                                onClick={() => setIsModalPasswordOpen(true)}
                            >
                                Modifier
                            </a>
                        </div>
                        <Button
                            className='mt-10'
                            onClick={() =>
                                setIsModalDetailsOpen(!isModalDetailsOpen)
                            }
                        >
                            Modifier mes informations
                        </Button>
                    </div>
                </div>
            </section>

            {isModalAvatarOpen && (
                <ModalModifyAvatar
                    isOpen={isModalAvatarOpen}
                    handleClose={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                    avatarId={avatarId}
                    type='profil'
                />
            )}
            {isModalDetailsOpen && user && (
                <ModalModifyDetails
                    isOpen={isModalDetailsOpen}
                    handleClose={() =>
                        setIsModalDetailsOpen(!isModalDetailsOpen)
                    }
                    user={user}
                />
            )}
            {isModalPasswordOpen && (
                <ModalModifyPassword
                    isOpen={isModalPasswordOpen}
                    handleClose={() =>
                        setIsModalPasswordOpen(!isModalPasswordOpen)
                    }
                />
            )}
        </>
    )
}

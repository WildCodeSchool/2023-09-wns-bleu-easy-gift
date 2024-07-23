import { Button } from '../ui/button'
import {
    Avatar,
    useGroupAvatarsQuery,
    useProfilAvatarsQuery,
    useUpdateAvatarMutation,
    useUpdateGroupAvatarMutation,
    UpdateAvatarMutationVariables,
    UpdateGroupAvatarMutationVariables,
    GetUserInfosDocument,
    UsersDocument,
} from '../../graphql/generated/schema'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import clsx from 'clsx'
import { toast } from 'react-toastify'

type ModalModifyAvatarProps = {
    isOpen: boolean
    handleClose: () => void
    avatarId?: number
    type: 'profil' | 'group' // Utilisation d'une union de chaînes pour type
    groupId?: number
}

export default function ModalModifyAvatar({
    isOpen,
    handleClose,
    avatarId,
    type,
    groupId,
}: ModalModifyAvatarProps) {
    const [avatars, setAvatars] = useState<Avatar[]>([])
    const [modalScroll, setModalScroll] = useState(false)
    const modalContentRef = useRef<HTMLDivElement>(null)
    const [avatar, setAvatarId] = useState<number | undefined>(avatarId)

    const [updateAvatarMutation] = useUpdateAvatarMutation()
    const [updateGroupAvatarMutation] = useUpdateGroupAvatarMutation()

    //to adjust the scroll of the modal
    const handleResize = () => {
        const windowHeight = window.innerHeight
        const modalElement = modalContentRef.current

        if (modalElement) {
            const height = modalElement.offsetHeight
            if (height > windowHeight) {
                setModalScroll(true)
            } else {
                setModalScroll(false)
            }
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isOpen])

    const onConfirm = async () => {
        try {
            if (type === 'profil') {
                await updateAvatarMutation({
                    variables: { data: { avatarId: avatar! } },
                    refetchQueries: [
                        {
                            query: GetUserInfosDocument,
                        },
                    ],
                    awaitRefetchQueries: true,
                })
                toast.success('Avatar de profil mis à jour avec succès!')
            } else if (type === 'group' && groupId !== undefined) {
                const variables: UpdateGroupAvatarMutationVariables = {
                    groupId,
                    avatarId: avatar!,
                }
                await updateGroupAvatarMutation({
                    variables,
                    refetchQueries: [
                        {
                            query: UsersDocument,
                            variables: { groupId },
                        },
                    ],
                    awaitRefetchQueries: true,
                })
                toast.success('Avatar de groupe mis à jour avec succès!')
            }
            handleClose()
        } catch (error) {
            console.error('Error updating avatar:', error)
            toast.error("Erreur lors de la mise à jour de l'avatar.")
        }
    }

    //end of inmport code scroll modal

    const {
        data: profilData,
        loading: profilLoading,
        error: profilError,
    } = useProfilAvatarsQuery()
    const {
        data: groupData,
        loading: groupLoading,
        error: groupError,
    } = useGroupAvatarsQuery()

    useEffect(() => {
        if (type === 'profil') {
            if (profilData?.profilAvatars) {
                setAvatars(profilData.profilAvatars as Avatar[])
            }
        } else if (type === 'group') {
            if (groupData?.groupAvatars) {
                setAvatars(groupData.groupAvatars as Avatar[])
            }
        }
    }, [groupData, profilData, type])

    if (profilLoading || groupLoading) return <div>Loading...</div>
    if (profilError || groupError) return <div>Error loading avatars</div>

    const modalStyles: CSSProperties = {
        position: 'absolute',
        top: modalScroll ? '16px' : '50%',
        left: '50%',
        transform: modalScroll ? 'translateX(-50%)' : 'translate(-50%, -50%)',
        maxHeight: 'calc(100vh - 32px)', // Pour inclure le padding en haut et en bas
        overflowY: 'auto',
    }

    return (
        <div className='absolute inset-0 flex justify-center items-center'>
            <div className='fixed inset-0 bg-black/50 z-50'>
                <div
                    ref={modalContentRef}
                    className='w-10/12 bg-white p-3 xl:max-w-6/12 xl:p-5'
                    style={modalStyles}
                >
                    <div className='flex justify-between'>
                        <p className='mb-9 text-lg text-left md:mb-10 md:text-xl text-primaryBlue'>
                            Sélectionne ton nouvel avatar
                        </p>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            fill='currentColor'
                            className='bi bi-x-lg hover:cursor-pointer'
                            viewBox='0 0 16 16'
                            onClick={() => handleClose()}
                        >
                            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                        </svg>
                    </div>

                    <div className='flex flex-wrap justify-center'>
                        {avatars.map(avatarItem => (
                            <img
                                key={avatarItem.id}
                                src={avatarItem.url}
                                className={clsx(
                                    'w-12 h-12 mb-5 hover:border-solid hover:border-4 hover:border-primaryRed duration-100 rounded-full mr-2 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24',
                                    avatarItem.id === avatar &&
                                        'border-solid border-4 border-primaryRed'
                                )}
                                alt={avatarItem.name}
                                onClick={() => setAvatarId(avatarItem.id)}
                            />
                        ))}
                    </div>
                    <Button onClick={() => onConfirm()}>Sauvegarder</Button>
                </div>
            </div>
        </div>
    )
}

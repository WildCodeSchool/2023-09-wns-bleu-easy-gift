import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
    useProfilAvatarsQuery,
    useUpdateUserMutation,
    GetUserInfosQuery,
} from '../../graphql/generated/schema'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import { getConstraints } from '@/lib/utils'
import { toast } from 'react-toastify'

interface ModalModifyDetailsProps {
    isOpen: boolean
    handleClose: () => void
    user?: GetUserInfosQuery['getUserInfos']
}

export default function ModalModifyDetails({
    isOpen,
    handleClose,
    user,
}: ModalModifyDetailsProps) {
    const [modalScroll, setModalScroll] = useState(false)
    const modalContentRef = useRef<HTMLDivElement>(null)
    const [pseudo, setPseudo] = useState(user?.pseudo)
    const [email, setEmail] = useState(user?.email)

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

    const onConfirm = (e: React.FormEvent) => {
        e.preventDefault()

        updateUserMutation({
            variables: { data: { email: email, pseudo: pseudo } },
        })
            .then(() => {
                toast.success('Les informations ont été modifiées avec succès!')
                handleClose()
                window.location.reload()
            })
            .catch(console.error)
        toast.error('Erreur lors de la modification des informations.')
    }

    //end of inmport code scroll modal

    const { data, loading, error } = useProfilAvatarsQuery()

    // useEffect(() => {
    //   if (data?.profilAvatars) {
    //     setAvatars(data.profilAvatars as Avatar[]);
    //   }
    // }, [data]);

    const [updateUserMutation, { loading: updating, error: updateError }] =
        useUpdateUserMutation()

    const errorMessages = getConstraints(
        updateError?.graphQLErrors[0].extensions.validationErrors
    )

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error loading avatars</div>

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
                    className='bg-white w-9/12 md:w-7/12 lg:w-4/12 2xl:w-3/12 xl:p-5'
                    style={modalStyles}
                >
                    <div className='p-3'>
                        <div className='flex justify-between '>
                            <p className='mb-9 text-lg text-left md:mb-10 md:text-xl text-primaryBlue'>
                                Modifier mes informations
                            </p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='currentColor'
                                className='bi bi-x-lg hover:cursor-pointer 2xl:ml-10'
                                viewBox='0 0 16 16'
                                onClick={() => handleClose()}
                            >
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                            </svg>
                        </div>

                        <div className='flex justify-center'>
                            <form className='gap-2' onSubmit={onConfirm}>
                                <Input
                                    id='pseudo'
                                    type='text'
                                    name='pseudo'
                                    label='Choisissez un nouveau pseudo'
                                    value={pseudo}
                                    onChange={e => setPseudo(e.target.value)}
                                />

                                <Input
                                    id='email'
                                    type='email'
                                    name='email'
                                    label='Modifier votre email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <div className='mb-4'>
                                    {errorMessages &&
                                        errorMessages.map((item, index) =>
                                            Object.values(item).map(
                                                (value: any, valueIndex) => (
                                                    <p
                                                        key={`${index}-${valueIndex}`}
                                                        className='text-red-500 mt-2'
                                                    >
                                                        {value}
                                                    </p>
                                                )
                                            )
                                        )}
                                </div>
                                <div className='flex justify-center'>
                                    <Button type='submit' className='mt-10'>
                                        {'Modifier'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

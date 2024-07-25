import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import clsx from 'clsx'
import { useUpdatePasswordMutation } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'

interface ModalModifyPasswordProps {
    isOpen: boolean
    handleClose: () => void
}

export default function ModalModifyPassword({
    isOpen,
    handleClose,
}: ModalModifyPasswordProps) {
    const [modalScroll, setModalScroll] = useState(false)
    const modalContentRef = useRef<HTMLDivElement>(null)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

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

    const [updateUserPasswordMutation, { loading, error }] =
        useUpdatePasswordMutation()

    const onConfirm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateUserPasswordMutation({
                variables: { data: { oldPassword, newPassword } },
            })
            toast.success('Le mot de passe a été modifié avec succès!')
            handleClose()
            window.location.reload()
        } catch (err) {
            console.error(err)
            toast.error('Erreur lors de la modification du mot de passe.')
        }
    }

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
                                Modifier le mot de passe
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
                                <label htmlFor='oldPassword'>
                                    Entrez votre ancien mot de passe
                                </label>
                                <Input
                                    id='oldPassword'
                                    type='password'
                                    name='oldPassword'
                                    value={oldPassword}
                                    onChange={e =>
                                        setOldPassword(e.target.value)
                                    }
                                    className='mb-6'
                                />

                                <label htmlFor='newPassword'>
                                    Entrez votre nouveau mot de passe
                                </label>
                                <Input
                                    id='newPassword'
                                    type='password'
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={e =>
                                        setNewPassword(e.target.value)
                                    }
                                />

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

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    GetGroupByIdDocument,
    useAddNewMembersToGroupMutation,
} from '@/graphql/generated/schema'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { getConstraints } from '@/lib/utils'
import { toast } from 'react-toastify'

interface Group {
    name: string
    event_date?: string | null
    id?: number
}

interface ModalUpdateGroupProps {
    onClose: () => void
    group?: Group
}

const iconStar = {
    id: 'star',
    path: 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z',
    viewBox: '0 0 16 16',
}
const iconTrash = {
    id: 'trash',
    path: 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5',
    viewBox: '0 0 16 16',
}

export default function ModalUpdateGroup({
    onClose,
    group,
}: ModalUpdateGroupProps) {
    const router = useRouter()
    const [updateMembers, { error }] = useAddNewMembersToGroupMutation()
    const groupId = typeof group?.id === 'number' ? group?.id : 0
    const [email, setEmail] = useState<string>('')
    const [emails, setEmails] = useState<string[]>([])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formJSON: any = Object.fromEntries(formData.entries())
        formJSON.emailUsers = emails

        updateMembers({
            variables: {
                groupId: groupId,
                data: formJSON as any,
            },
            refetchQueries: [
                {
                    query: GetGroupByIdDocument,
                    variables: { groupId: groupId },
                },
            ],
            awaitRefetchQueries: true,
        })
            .then(res => {
                toast.success('Groupe mis à jour avec succès!')
                onClose()
            })
            .catch(err => {
                toast.error(
                    `Erreur lors de la mise à jour du groupe: ${err.message}`
                )
                console.error(err)
            })
    }

    const handleAddEmail = () => {
        if (email && !emails.includes(email)) {
            setEmails([...emails, email])
            setEmail('')
        }
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handleRemoveEmail = (emailToRemove: string) => {
        setEmails(emails.filter(email => email !== emailToRemove))
    }

    const errorMessages = getConstraints(
        error?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            <div className='flex justify-between'>
                <h2 className='mb-9 text-lg text-left md:mb-10 md:text-xl text-primaryBlue'>
                    Ajouter un nouveau membre
                </h2>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className='bi bi-x-lg hover:cursor-pointer 2xl:ml-10'
                    viewBox='0 0 16 16'
                    onClick={onClose}
                    aria-label="Fermer la fenetre d'ajout de membres"
                >
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-1 mb-4'>
                    <label
                        className='text-sm font-medium text-muted-foreground'
                        htmlFor='emailUsers'
                    >
                        Email du nouveau membre
                    </label>
                    <div className='flex flex-wrap lg:justify-between items-center'>
                        <Input
                            id='emailUsers'
                            type='mail'
                            name='emailUsers'
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='nouveau@membre.fr'
                            className='w-80 border border-gray-300 rounded'
                        />
                        <Button
                            type='button'
                            className='flex-shrink-0'
                            onClick={handleAddEmail}
                        >
                            +
                        </Button>
                    </div>
                </div>
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
                {emails.length > 0 && (
                    <div className='flex mb-4 flex-wrap gap-4'>
                        {emails.map((email, index) => (
                            <div
                                key={index}
                                className='flex items-center group relative'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='w-5 h-5 text-primaryBlue mr-2'
                                    viewBox={iconStar.viewBox}
                                >
                                    <path d={iconStar.path} />
                                </svg>
                                <label htmlFor={email} className='ml-2'>
                                    {email}
                                </label>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='w-5 h-5 ml-2 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primaryRed'
                                    viewBox={iconTrash.viewBox}
                                    onClick={() => handleRemoveEmail(email)}
                                >
                                    <path d={iconTrash.path} />
                                </svg>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <Button type='submit' className='w-full'>
                        Valider
                    </Button>
                </div>
            </form>
        </div>
    )
}

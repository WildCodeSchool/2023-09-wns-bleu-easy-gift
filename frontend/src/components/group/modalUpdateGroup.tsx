import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    GetGroupByIdDocument,
    useUpdateGroupMutation,
} from '@/graphql/generated/schema'
import { FormEvent } from 'react'
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
export default function ModalUpdateGroup({
    onClose,
    group,
}: ModalUpdateGroupProps) {
    const router = useRouter()
    const [updateGroup, { error }] = useUpdateGroupMutation()
    const groupId = typeof group?.id === 'number' ? group?.id : 0

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formJSON: any = Object.fromEntries(formData.entries())

        updateGroup({
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
                router.push(`/group/${res.data?.updateGroup.id}`)
            })
            .catch(err => {
                toast.error(
                    `Erreur lors de la mise à jour du groupe: ${err.message}`
                )
                console.error(err)
            })
    }

    const errorMessages = getConstraints(
        error?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            <div className='flex justify-between'>
                <p className='mb-9 text-lg text-left md:mb-10 md:text-xl text-primaryBlue'>
                    Modifier le groupe
                </p>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className='bi bi-x-lg hover:cursor-pointer 2xl:ml-10'
                    viewBox='0 0 16 16'
                    onClick={onClose}
                    aria-label='Fermer la fenetre de modification de membres'
                >
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-1 mb-4'>
                    <label
                        className='text-sm font-medium text-muted-foreground'
                        htmlFor='name'
                    >
                        Nom du groupe
                    </label>
                    <Input
                        id='name'
                        type='text'
                        name='name'
                        defaultValue={group?.name}
                        placeholder='nom du groupe'
                        className='mt-1 w-full p-2 border border-gray-300 rounded'
                    />
                </div>

                <div className='grid gap-1'>
                    <label
                        className='text-sm font-medium text-muted-foreground'
                        htmlFor='event_date'
                    >
                        Date de l'évenement
                    </label>
                    <Input
                        id='event_date'
                        type='date'
                        name='event_date'
                        defaultValue={group?.event_date ?? undefined}
                        className='mt-1 w-full p-2 border border-gray-300 rounded'
                    />
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
                <div>
                    <Button type='submit' className='w-full'>
                        Valider
                    </Button>
                </div>
            </form>
        </div>
    )
}

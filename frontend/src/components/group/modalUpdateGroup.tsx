import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    GetGroupByIdDocument,
    useUpdateGroupMutation,
} from '@/graphql/generated/schema'
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { getConstraints } from '@/lib/utils'

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
        console.log(formJSON)

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
                onClose()
                router.push(`/group/${res.data?.updateGroup.id}`)
            })
            .catch(console.error)
    }

    const errorMessages = getConstraints(
        error?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>Modifier le groupe</h2>
                <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-600'
                >
                    &times;
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Nom du groupe</label>
                    <Input
                        type='text'
                        name='name'
                        defaultValue={group?.name}
                        placeholder='nom du groupe'
                        className='mt-1 w-full p-2 border border-gray-300 rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>
                        Date de l'évenement
                    </label>
                    <Input
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
                    <Button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
                    >
                        Valider
                    </Button>
                </div>
            </form>
        </div>
    )
}

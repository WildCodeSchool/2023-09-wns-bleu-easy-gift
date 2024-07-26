import {
    useGetUserByTokenQuery,
    useRegisterWithTokenMutation,
} from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getConstraints } from '@/lib/utils'
import Head from 'next/head'

export default function ConfirmParticipationPage() {
    const [errorMatchPassword, setErrorMatchPassword] = useState(false)
    const router = useRouter()

    const token = router.query.token as string

    const { data, loading, error } = useGetUserByTokenQuery({
        variables: {
            token,
        },
    })

    const [registerWithToken, { error: registerError }] =
        useRegisterWithTokenMutation({
            onCompleted: () => {
                router.push('/auth/login')
            },
        })

    if (!data || error) return <div>error</div>

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)

        const { password, confirmPassword } = data

        if (password !== confirmPassword) {
            setErrorMatchPassword(true)
            return
        }

        setErrorMatchPassword(false)

        registerWithToken({
            variables: {
                data: {
                    pseudo: data.pseudo as string,
                    password: data.password as string,
                    token,
                },
            },
        }).catch(console.error)
    }

    const errorMessages = getConstraints(
        registerError?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <>
            <Head>
                <title>
                    Création de mon compte suite à une invitation à rejoindre un
                    groupe - Easy Gift
                </title>
            </Head>
            <div className='flex flex-col  justify-center  items-center w-full h-full '>
                <form
                    className='flex flex-col items-center gap-2'
                    onSubmit={handleSubmit}
                >
                    <div className='grid gap-1'>
                        <label
                            htmlFor='pseudo'
                            className='text-sm font-medium text-muted-foreground'
                        >
                            Pseudo
                        </label>
                        <Input
                            id='pseudo'
                            type='text'
                            name='pseudo'
                            defaultValue={data.getUserByToken.pseudo}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label
                            htmlFor='password'
                            className='text-sm font-medium text-muted-foreground'
                        >
                            Mot de passe
                        </label>
                        <Input
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Indiquez votre mot de passe'
                            required
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label
                            className='text-sm font-medium text-muted-foreground'
                            htmlFor='confirmPassword'
                        >
                            Confirmez votre mot de passe
                            <Input
                                id='confirmPassword'
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirmez votre mot de passe'
                                required
                            />
                        </label>
                    </div>

                    {errorMatchPassword && (
                        <p className='text-red-600'>
                            Les mots de passe ne correspondent pas
                        </p>
                    )}
                    <div className='mb-4'>
                        {errorMessages &&
                            errorMessages.map((item, index) =>
                                Object.values(item).map(
                                    (value: any, valueIndex) => (
                                        <p
                                            key={`${index}-${valueIndex}`}
                                            className='text-red-600 mt-2'
                                        >
                                            {value}
                                        </p>
                                    )
                                )
                            )}
                    </div>
                    <Button type='submit'>{"S'enregistrer"}</Button>
                </form>
            </div>
        </>
    )
}

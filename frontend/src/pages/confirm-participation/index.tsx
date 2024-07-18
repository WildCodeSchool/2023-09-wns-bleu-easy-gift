import {
    useGetUserByTokenQuery,
    useRegisterWithTokenMutation,
} from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ConfirmParticipationPage() {
    const [errorMatchPassword, setErrorMatchPassword] = useState(false)
    const router = useRouter()

    const token = router.query.token as string

    const { data, loading, error } = useGetUserByTokenQuery({
        variables: {
            token,
        },
    })

    const [registerWithToken] = useRegisterWithTokenMutation({
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
        })
    }

    return (
        <div className='flex flex-col  justify-center  items-center w-full h-full '>
            <form
                className='flex flex-col items-center gap-2'
                onSubmit={handleSubmit}
            >
                <Input
                    type='text'
                    name='pseudo'
                    defaultValue={data.getUserByToken.pseudo}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Indiquez votre mot de passe'
                />
                <Input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirmez votre mot de passe'
                />
                {errorMatchPassword && (
                    <p className='text-red-500'>
                        Les mots de passe ne correspondent pas
                    </p>
                )}
                <Button type='submit'>{"S'enregistrer"}</Button>
            </form>
        </div>
    )
}

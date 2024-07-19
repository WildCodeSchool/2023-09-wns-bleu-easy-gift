import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterUserMutation } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Register() {
    const router = useRouter()
    // const [register, { data, error }] = useRegisterUserMutation({
    //     onCompleted: () => {
    //         router.push('/auth/login')
    //     },
    // })
    const [register, { data }] = useRegisterUserMutation({
        onCompleted: () => {
            router.push('/auth/login')
        },
    })
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)
        console.log('data register', data)
        // register({
        //     variables: {
        //         data: {
        //             email: data.email as string,
        //             password: data.password as string,
        //             pseudo: data.pseudo as string,
        //         },
        //     },
        // })
        try {
            await register({
                variables: {
                    data: {
                        email: data.email as string,
                        password: data.password as string,
                        pseudo: data.pseudo as string,
                    },
                },
            })
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue')
            console.error('err.message', err.message)
        }
    }

    return (
        <section className='flex flex-col gap-6 pb-6 justify-center items-center mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
            <h2 className='text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                Inscription
            </h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form
                className='flex flex-col items-center gap-2'
                onSubmit={handleSubmit}
            >
                <label className='mb-3'>
                    Pseudo
                    <Input type='text' name='pseudo' />
                </label>
                <label className='mb-3'>
                    Email
                    <Input type='email' name='email' />
                </label>
                <label>
                    Mot de passe
                    <Input type='password' name='password' />
                </label>
                <Button type='submit' className='mt-6'>
                    {'Valider'}
                </Button>
            </form>
        </section>
    )
}

export default Register

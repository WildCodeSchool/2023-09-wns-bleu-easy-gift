import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLogin, useLoginLazyQuery } from '@/graphql/generated/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

function Login() {
    const router = useRouter()
    const [login, { data, error }] = useLoginLazyQuery()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (data) {
            if (data.login.success) {
                toast.success('Connexion réussie!')
                setIsLoggedIn(true)
            } else {
                toast.error(
                    'Erreur lors de la connexion: Vérifiez vos informations'
                )
            }
        }

        if (error) {
            toast.error(`Erreur lors de la connexion: ${error.message}`)
        }
    }, [data, error])

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const loginData = Object.fromEntries(formData) as InputLogin
        if (loginData.email && loginData.password) {
            await login({
                variables: {
                    infos: {
                        email: loginData.email,
                        password: loginData.password,
                    },
                },
            })
        }
    }
    return (
        <section className='w-full h-full flex-grow flex flex-col gap-6 pb-6 my-10 justify-center items-center lg:h-screen lg:m-0'>
            <h1 className='text-xl md:text-2xl 2xl:text-3xl font-bold text-primaryBlue lg:mb-8'>
                Connexion
            </h1>
            <form
                className='flex flex-col items-center gap-2 lg:h-3/5'
                onSubmit={handleSubmit}
            >
                <label className='mb-3'>
                    Email
                    <Input
                        data-testid='login-email'
                        id='email'
                        type='email'
                        name='email'
                    />
                </label>
                <label>
                    Mot de passe
                    <Input
                        data-testid='login-password'
                        id='password'
                        type='password'
                        name='password'
                    />
                </label>
                <Button
                    data-testid='login-button'
                    type='submit'
                    className='mt-9 mb-5 lg:mb-8'
                >
                    {'Se connecter'}
                </Button>

                <Link href={'/auth/register'} className='text-blue-600 mb-2 lg:mb-4'>
                    Pas encore de compte ?
                </Link>

                <Link
                    href={'/auth/forgot-password'}
                    className='text-blue-600 hover:underline'
                >
                    J'ai oublié mon mot de passe 🤭
                </Link>
            </form>
        </section>
    )
}

export default Login

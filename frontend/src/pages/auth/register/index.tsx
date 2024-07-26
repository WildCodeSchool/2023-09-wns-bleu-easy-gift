import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterUserMutation } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import { getConstraints } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'

function Register() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [register, { error }] = useRegisterUserMutation({
        onCompleted: data => {
            if (data) {
                toast.success(
                    'Inscription réussie! Vous pouvez maintenant vous connecter.'
                )
                router.push('/auth/login')
            } else {
                toast.error(
                    "Erreur lors de l'inscription: Vérifiez vos informations."
                )
            }
        },
        onError: error => {
            toast.error(`Erreur lors de l'inscription: ${error.message}`)
        },
    })

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message || 'Une erreur est survenue')
        }
    }, [error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)
        register({
            variables: {
                data: {
                    email: data.email as string,
                    password: data.password as string,
                    pseudo: data.pseudo as string,
                },
            },
        }).catch(err => {
            setErrorMessage(err.message || 'Une erreur est survenue')
            console.error('err.message', err.message)
        })
    }

    const errorMessages = getConstraints(
        error?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <>
            <Head>
                <title>Création de mon compte - Easy Gift</title>
            </Head>
            <section className='w-full h-full flex-grow flex flex-col gap-6 pb-6 my-10 justify-center items-center lg:h-screen lg:m-0'>
                <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-primaryBlue lg:mb-8'>
                    Inscription
                </h1>
                <div>
                    {errorMessages &&
                        errorMessages.map((item, index) =>
                            Object.values(item).map(
                                (value: any, valueIndex) => (
                                    <p
                                        key={`${index}-${valueIndex}`}
                                        className='text-red-600'
                                    >
                                        {value}
                                    </p>
                                )
                            )
                        )}
                </div>
                <form
                    className='flex flex-col items-center gap-2 lg:h-3/5'
                    onSubmit={handleSubmit}
                >
                    <div className='grid gap-1'>
                        <label
                            htmlFor='pseudo'
                            className='text-sm font-medium text-muted-foreground'
                        >
                            Pseudo
                        </label>
                        <Input id='pseudo' type='text' name='pseudo' required />
                    </div>

                    <div className='grid gap-1'>
                        <label
                            htmlFor='email'
                            className='text-sm font-medium text-muted-foreground'
                        >
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <Input id='email' type='email' name='email' required />
                    </div>

                    <div className='grid gap-1'>
                        <label
                            htmlFor='password'
                            className='text-sm font-medium text-muted-foreground'
                        >
                            Mot de passe <span className='text-red-600'>*</span>
                        </label>
                        <Input
                            id='password'
                            type='password'
                            name='password'
                            required
                        />
                    </div>

                    <Button type='submit' className='mt-9 mb-5 lg:mb-8'>
                        {'Valider'}
                    </Button>
                    <p className='text-red-600'>* Champs obligatoires</p>
                </form>
            </section>
        </>
    )
}

export default Register

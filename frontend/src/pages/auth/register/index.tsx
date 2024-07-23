import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterUserMutation } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import { getConstraints } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function Register() {
    const router = useRouter()
    // const [register, { data, error }] = useRegisterUserMutation({
    //     onCompleted: () => {
    //         router.push('/auth/login')
    //     },
    // })
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message || 'Une erreur est survenue')
        }
    }, [error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)
        console.log('data register', data)
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

    console.log(error?.graphQLErrors)

    return (
        <section className='flex flex-col gap-6 pb-6 justify-center items-center mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
            <h2 className='text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                Inscription
            </h2>
            {errorMessages &&
                errorMessages.map((item, index) =>
                    Object.values(item).map((value: any, valueIndex) => (
                        <p
                            key={`${index}-${valueIndex}`}
                            className='text-red-500 mt-2'
                        >
                            {value}
                        </p>
                    ))
                )}
            {error && <p className='text-red-500'>{errorMessage}</p>}
            <form
                className='flex flex-col items-center gap-2'
                onSubmit={handleSubmit}
            >
                <label className='mb-3'>
                    Pseudo
                    <Input type='text' name='pseudo' />
                </label>
                <label className='mb-3'>
                    Email <span className='text-red-500'>*</span>
                    <Input type='email' name='email' />
                </label>
                <label>
                    Mot de passe <span className='text-red-500'>*</span>
                    <Input type='password' name='password' />
                </label>
                <Button type='submit' className='mt-6'>
                    {'Valider'}
                </Button>
                <p className='text-red-500 mt-4'>* Champs obligatoires</p>
            </form>
        </section>
    )
}

export default Register

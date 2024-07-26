import { useState } from 'react'
import { useForgotPasswordMutation } from '@/graphql/generated/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import Head from 'next/head'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [forgotPassword, { data, loading, error }] =
        useForgotPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await forgotPassword({ variables: { email } })
            toast.success('Email envoyé avec succès !')
        } catch (err) {
            toast.error("Erreur lors de l'envoi de l'email")
        }
    }

    return (
        <>
            <Head>
                <title>
                    Oubli du mot de passe, envoi d'un email de réinitialisation
                    - Easy Gift
                </title>
            </Head>
            <section className='w-full h-full flex-grow flex flex-col gap-6 pb-6 my-10 justify-center items-center lg:h-screen lg:m-0'>
                <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-primaryBlue lg:mb-8'>
                    Réinitialiser le mot de passe
                </h1>
                <form
                    className='flex flex-col items-center gap-2 lg:h-3/5'
                    onSubmit={handleSubmit}
                >
                    <p className='mb-3'>
                        Recevoir un email pour ré-initialiser son mot de passe
                    </p>
                    <div className='grid gap-1'>
                        <label
                            className='text-sm font-medium text-muted-foreground'
                            htmlFor='email'
                        >
                            Mon email
                        </label>
                        <Input
                            data-testid='forgot-password-email'
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type='submit'
                        className='mt-9 mb-5 lg:mb-8'
                        disabled={loading}
                    >
                        Envoyer
                    </Button>
                </form>
                {data && data.forgotPassword && (
                    <>
                        <p className='text-green-700'>
                            Email envoyé avec succès !
                        </p>
                        <p className='text-green-700'>
                            Rendez-vous sur votre messagerie pour ré-initialiser
                            votre mot de passe.
                        </p>
                    </>
                )}
                {error && <p className='text-red-600'>{error.message}</p>}
            </section>
        </>
    )
}

export default ForgotPassword

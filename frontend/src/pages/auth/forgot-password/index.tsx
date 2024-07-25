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
                <title>Page de connexion à mon compte - Easy Gift</title>
            </Head>
            <section className='flex flex-col gap-6 pb-6 justify-center items-center mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
                <h1 className='text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                    Réinitialisation du mot de passe
                </h1>
                <p>Recevoir un email pour ré-initialiser son mot de passe</p>
                <form
                    className='flex flex-col items-center gap-2'
                    onSubmit={handleSubmit}
                >
                    <label className='mb-3'>
                        Mon email
                        <Input
                            data-testid='forgot-password-email'
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <Button type='submit' className='mt-5' disabled={loading}>
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

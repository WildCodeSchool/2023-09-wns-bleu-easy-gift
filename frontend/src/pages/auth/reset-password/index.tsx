import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/router'
import { useResetPasswordMutation } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'
import Head from 'next/head'

function ResetPassword() {
    const router = useRouter()
    const { token } = router.query
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetPassword, { data, error }] = useResetPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas')
            return
        }
        try {
            const result = await resetPassword({
                variables: { token: token as string, newPassword: password },
            })
            if (result.data?.resetPassword.success) {
                toast.success('Mot de passe réinitialisé avec succès!')
                router.push('/auth/login')
            } else {
                toast.error(
                    'Erreur lors de la réinitialisation du mot de passe'
                )
            }
        } catch (error) {
            toast.error('Erreur lors de la réinitialisation du mot de passe')
        }
    }

    return (
        <>
            <Head>
                <title>Page de connexion à mon compte - Easy Gift</title>
            </Head>
            <section className='w-full h-full flex-grow flex flex-col gap-6 pb-6 my-10 justify-center items-center lg:h-screen lg:m-0'>
                <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-primaryBlue lg:mb-8'>
                    Réinitialiser le mot de passe
                </h1>
                <form
                    className='flex flex-col items-center gap-2 lg:h-3/5'
                    onSubmit={handleSubmit}
                >
                    <label className='mb-3' htmlFor='password'>
                        Nouveau mot de passe
                        <Input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>

                    <label className='mb-3' htmlFor='confirm-password'>
                        Confirmez le mot de passe
                        <Input
                            type='password'
                            id='confirm-password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </label>

                    <Button type='submit' className='mt-9 mb-5 lg:mb-8'>
                        {'Réinitialiser'}
                    </Button>
                </form>
            </section>
        </>
    )
}

export default ResetPassword

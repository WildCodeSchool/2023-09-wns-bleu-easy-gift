import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/router'
import { useResetPasswordMutation } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'

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
        <section className='flex flex-col gap-6 pb-6 justify-center items-center mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
            <h2 className='text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                Réinitialiser le mot de passe
            </h2>
            <form
                className='flex flex-col items-center gap-2'
                onSubmit={handleSubmit}
            >
                <label className='mb-3'>
                    Nouveau mot de passe
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label className='mb-3'>
                    Confirmer le mot de passe
                    <Input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <Button type='submit' className='mt-6'>
                    {'Réinitialiser'}
                </Button>
            </form>
        </section>
    )
}

export default ResetPassword

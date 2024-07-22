//frontend/src/pages/auth/login.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLogin, useLoginLazyQuery } from '@/graphql/generated/schema'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Login() {
    const router = useRouter()
    const [login, { data, error }] = useLoginLazyQuery({
        onCompleted: () => {
            router.push('/')
        },
    })
    console.log(data, error)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData) as InputLogin
        console.log('data login', data)
        if (data.email && data.password) {
            await login({
                variables: {
                    infos: { email: data.email, password: data.password },
                },
            })
        }
    }
    return (
        <section className='flex flex-col gap-6 pb-6 justify-center items-center mx-auto w-10/12 md:max-w-2xl lg:max-w-4xl xl:max-w-[1100px]'>
            <h2 className='text-xl lg:text-2xl 2xl:text-3xl font-bold text-primaryBlue'>
                Connexion
            </h2>
            <form
                className='flex flex-col items-center gap-2'
                onSubmit={handleSubmit}
            >
                <label className='mb-3'>
                    Email
                    <Input
                        data-testid='login-email'
                        id='email'
                        type='email'
                        name='email'
                        // placeholder='exemple@gmail.com'
                    />
                </label>
                <label>
                    Mot de passe
                    <Input
                        data-testid='login-password'
                        id='password'
                        type='password'
                        name='password'
                        // placeholder='MonMotDePasse'
                    />
                </label>
                <Button type='submit' className='mt-6'>
                    {'Se connecter'}
                </Button>
                <Button variant={'link'}>
                    <Link href={'/auth/register'} className='text-blue-600'>
                        Pas encore de compte ?
                    </Link>
                </Button>
            </form>
            {/* </div> */}
        </section>
    )
}

export default Login

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function GroupCreated() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>
                    Page de validation de création d'un groupe - Easy Gift
                </title>
            </Head>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold mb-4'>
                    Votre groupe a été créé !
                </h1>
                <div className='flex flex-col item-center'>
                    <Button
                        className='mb-4'
                        onClick={() => router.push('/creating-groups')}
                    >
                        Сréer un nouveau groupe
                    </Button>
                    <Button
                        className='mb-4'
                        onClick={() => router.push('/gift-deteil')}
                    >
                        Voir les details du groupe
                    </Button>
                    <Button
                        className='mb-4'
                        onClick={() => router.push('/gift-list')}
                    >
                        Voir la liste des groupes
                    </Button>
                </div>
                <p className='text-green-700 mt-4'>Succès</p>
                <p>Les invitations ont été envoyées à vos participants !</p>
            </div>
        </>
    )
}

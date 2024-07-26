import React from 'react'
import { Button } from './ui/button'
import { useLogoutLazyQuery } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import { checkUserConnected } from '@/utils/checkConnection'
import { toast } from 'react-toastify'
import { error } from 'console'

export default function Logout() {
    const router = useRouter()
    const [logout] = useLogoutLazyQuery({
        onCompleted: () => {
            toast.success('Déconnexion réussie!')
            router.push('/').then(() => {
                window.location.reload()
            })
        },
        onError: error => {
            toast.error(`Erreur lors de la déconnexion: ${error.message}`)
        },
        fetchPolicy: 'cache-and-network',
    })

    const isConnected = checkUserConnected()

    if (!isConnected) {
        return null
    }

    return (
        <Button variant={'destructive'} onClick={() => logout()}>
            Se déconnecter
        </Button>
    )
}

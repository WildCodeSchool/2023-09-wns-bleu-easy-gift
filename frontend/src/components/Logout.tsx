import React from 'react'
import { Button } from './ui/button'
import { useLogoutLazyQuery } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import { checkUserConnected } from '@/utils/checkConnection'

export default function Logout() {
    const router = useRouter()
    const [logout] = useLogoutLazyQuery({
        onCompleted: () => {
            router.push('/')
        },
        fetchPolicy: 'cache-and-network',
    })

    const isConnected = checkUserConnected()
    console.log('status is connected', isConnected)

    if (!isConnected) {
        return null
    }

    return (
        <Button variant={"destructive"} className="bg-primaryRed" onClick={() => logout()}>
            Se déconnecter
        </Button>
    );
}

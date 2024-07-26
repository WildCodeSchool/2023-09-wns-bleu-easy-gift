import { useUsersQuery } from '@/graphql/generated/schema'
import ShowUsersList from '@/components/ShowUsersList'
import { connectedUserEmail } from '@/utils/checkConnection'

export default function UserList() {
    const { loading, data, error } = useUsersQuery({
        fetchPolicy: 'cache-and-network',
    })

    const email = connectedUserEmail()

    const users = data?.users || []

    const authorisedUsers = [
        'aurelie@gmail.com',
        'pierre@gmail.com',
        'olga@gmail.com',
        'jeremie@gmail.com',
        'leopold@gmail.com',
        'morgane@gmail.com',
        'jpourageaux@hotmail.fr',
        'lozachaurelie@gmail.com',
        'leopold.lesaulnier@gmail.com',
        'o.kuzkina@gmail.com',
        'morgane.lejeune@hotmail.fr',
    ]

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // Check if the user's email is in the list of authorized users
    if (email && authorisedUsers.includes(email)) {
        return <ShowUsersList users={users} />
    }

    return <div>Vous n'etes pas authorisé à accéder à cette page.</div>
}

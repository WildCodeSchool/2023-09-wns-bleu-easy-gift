import db from './db'
import { User } from './entities/user'
import { Avatar } from './entities/avatar'
import { clearDB } from '../src/db'
import initAvatars from './initAvatars'

export async function main() {
    await db.initialize()
    await clearDB()

    await initAvatars()

    const avatarIds = {
        Pierre: 1,
        Aurelie: 15,
        Olga: 3,
        Morgane: 4,
        Leopold: 5,
        Jeremie: 7,
    }

    for (const [pseudo, avatarId] of Object.entries(avatarIds)) {
        // Récupérez l'avatar correspondant à l'ID spécifié

        const avatar = await Avatar.findOne({ where: { id: avatarId } })
        // Vérifiez si l'avatar correspondant à l'ID existe
        if (!avatar) {
            console.error(`Avatar with ID ${avatarId} not found`)
            continue // Passez à l'utilisateur suivant si l'avatar n'est pas trouvé
        }

        // Créez l'utilisateur en lui associant l'avatar récupéré
        const user = User.create({
            pseudo: pseudo,
            email: `${pseudo.toLowerCase()}@gmail.com`,
            password: 'test@1234',
            avatar: avatar,
        })

        await user.save()
    }
}

main()

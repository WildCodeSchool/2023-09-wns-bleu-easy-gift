import db from './db'
import { User } from './entities/user'
import {clearDB} from '../src/db';


export async function main() {
    await db.initialize()
    await clearDB()

    const pierre = User.create({
        pseudo: 'Pierre',
        email: 'pierre@gmail.com',
        password: 'test@1234',
    })
    const aurelie = User.create({
        pseudo: 'Aurelie',
        email: 'aurelie@gmail.com',
        password: 'test@1234',
    })
    const olga = User.create({
        pseudo: 'Olga',
        email: 'olga@gmail.com',
        password: 'test@1234',
    })
    const morgane = User.create({
        pseudo: 'Morgane',
        email: 'morgane@gmail.com',
        password: 'test@1234',
    })
    const leopold = User.create({
        pseudo: 'Leopold',
        email: 'leopold@gmail.com',
        password: 'test@1234',
    })
    const jeremie = User.create({
        pseudo: 'Jeremie',
        email: 'jeremie@gmail.com',
        password: 'test@1234',
    })

    await pierre.save()
    await aurelie.save()
    await olga.save()
    await morgane.save()
    await leopold.save()
    await jeremie.save()
}

main()

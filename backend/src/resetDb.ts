import db from './db'
import { User } from './entities/user'

async function clearDB() {
    const runner = db.createQueryRunner()
    await runner.query("SET session_replication_role = 'replica'")
    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(
                `ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`,
            ),
        ),
    )
    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`),
        ),
    )
    await runner.query("SET session_replication_role = 'origin'")
    await db.synchronize()
}

async function main() {
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

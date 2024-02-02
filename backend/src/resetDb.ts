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
        firstName: 'Pierre',
    })
    const aurelie = User.create({
        firstName: 'Aurelie',
    })
    const olga = User.create({
        firstName: 'Olga',
    })
    const morgane = User.create({
        firstName: 'Morgane',
    })
    const leopold = User.create({
        firstName: 'Léopold',
    })
    const jeremie = User.create({
        firstName: 'Jérémie',
    })

    await pierre.save()
    await aurelie.save()
    await olga.save()
    await morgane.save()
    await leopold.save()
    await jeremie.save()
}

main()

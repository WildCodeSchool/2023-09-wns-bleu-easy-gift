import { DataSource } from 'typeorm'
import { User } from './entities/user'
import { Avatar } from './entities/avatar'
import { Group } from './entities/group'
import { Message } from './entities/message'
import { Discussion } from './entities/discussion'
import * as dotenv from 'dotenv'
import { UserToGroup } from './entities/userToGroup'
dotenv.config()

const db = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '0') || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    entities: [User, Group, Avatar, Message, Discussion, UserToGroup],
    synchronize: true,
    logging: true,
})

export async function clearDB() {
    const runner = db.createQueryRunner()
    await runner.query("SET session_replication_role = 'replica'")

    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(
                `ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`
            )
        )
    )
    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
        )
    )
    await runner.query("SET session_replication_role = 'origin'")
    await db.synchronize()
}

export default db

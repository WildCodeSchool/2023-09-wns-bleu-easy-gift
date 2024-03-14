import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Avatar } from './avatar'

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    created_at: Date

    @Column()
    modifited_at: Date

    @ManyToOne(() => Avatar, avatar => avatar.group)
    avatar: Avatar
}

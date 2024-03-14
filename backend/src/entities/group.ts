import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Avatar } from './avatar'
import { ObjectType, Field, Int } from 'type-graphql'
import { Length } from 'class-validator'

@ObjectType()
@Entity()
export class Group extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 30 })
    @Length(3, 30, {
        message: "Le nom de l'avatar doit contenir entre 3 and 30 caractères",
    })
    name: string

    @Field()
    @Column()
    created_at: Date

    @Field()
    @Column()
    modified_at: Date

    @Field(() => Avatar)
    @ManyToOne(() => Avatar, avatar => avatar.group)
    avatar: Avatar
}

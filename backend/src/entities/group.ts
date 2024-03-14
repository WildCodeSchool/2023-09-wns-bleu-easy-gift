import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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
        message: 'Le nom du group doit contenir entre 3 and 30 caractères',
    })
    name: string

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string

    @ManyToOne(() => Avatar, avatar => avatar.group, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => Int)
    avatar: Avatar
}

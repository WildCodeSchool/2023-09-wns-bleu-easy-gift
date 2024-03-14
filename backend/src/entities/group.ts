import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Avatar } from './avatar'
import { ObjectType, Field, Int } from 'type-graphql'
import { Length } from 'class-validator'
import { Discussion } from './discussion'

@ObjectType()
@Entity()
export class Group extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 30 })
    @Length(3, 30, {
        message: 'Le nom du groupe doit contenir entre 3 and 30 caractères',
    })
    name: string

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string

    @OneToMany(() => Discussion, discussion => discussion.group)
    discussions: Discussion[]

    @ManyToOne(() => Avatar, avatar => avatar.groups, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field()
    avatar: Avatar
}

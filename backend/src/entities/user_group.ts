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
    @Column()
    is_admin: boolean

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
    @Field(() => Avatar)
    avatar: Avatar
}

import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm'
import { Group } from './group'
import { Message } from './message'
import { User } from './user'

@Entity()
@ObjectType()
export class Discussion extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: string

    @Column({ length: 50 })
    @Field()
    name: string

    @CreateDateColumn()
    @Field()
    createdAt: string

    @UpdateDateColumn()
    @Field()
    modifiedAt: string

    @Field(() => Group)
    group: Group

    @OneToMany(() => Message, message => message.discussion)
    messages: Message[]

    @JoinTable()
    @ManyToMany(() => User, u => u.discussions, {
        cascade: true,
    })
    @Field(() => [User])
    users: User[]
}

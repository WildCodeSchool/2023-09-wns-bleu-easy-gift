import { Field, Int, ObjectType, InputType } from 'type-graphql'
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
    ManyToOne,
} from 'typeorm'
import { Group } from './group'
import { Message } from './message'
import { User } from './user'
import { ObjectId } from '../utils'

@Entity()
@ObjectType()
export class Discussion extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    // @Column({ length: 50 })
    // @Field()
    // name: string

    @CreateDateColumn()
    @Field()
    created_at: string

    @UpdateDateColumn()
    @Field()
    modified_at: string

    @ManyToOne(() => Group, g => g.discussions, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => Group)
    group?: Group

    @OneToMany(() => Message, m => m.discussion)
    messages?: Message[]

    @ManyToMany(() => User)
    @JoinTable()
    @Field(() => [User])
    users?: User[]

    @Field(() => User)
    @ManyToOne(() => User, user => user.discussions)
    userDiscussion: User
}

@InputType()
export class NewDiscussionInput {
    @Field()
    name: string

    @Field(() => ObjectId)
    group: ObjectId

    @Field(() => [ObjectId], { nullable: true })
    users?: ObjectId[]
}

@ObjectType()
export class GroupDiscussionsResponse {
    @Field(() => [Discussion])
    discussions: Discussion[]

    @Field(() => String)
    groupName: string

    @Field(() => String)
    groupAvatarUrl: string
}

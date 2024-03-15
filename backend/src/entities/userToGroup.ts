import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { User } from './user'
import { Group } from './group'

@ObjectType()
@Entity()
export class UserToGroup extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    user_id: number

    @Field()
    @Column()
    group_id: number

    @Field()
    @Column()
    is_admin: boolean

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string

    @ManyToOne(() => User, user => user.userToGroups)
    user: User

    @ManyToOne(() => Group, group => group.userToGroups)
    group: Group
}

@InputType()
export class NewGroupUserInput {
    @Field()
    group_id: number
    user_id: number
    is_admin: boolean
}

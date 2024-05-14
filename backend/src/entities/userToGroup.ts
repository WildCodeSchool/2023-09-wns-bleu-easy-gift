import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { User } from './user'
import { Group } from './group'

@ObjectType()
@Entity()
export class UserToGroup extends BaseEntity {
    // @Field(() => Int)
    // @PrimaryGeneratedColumn()
    // id: number
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    public id: number

    @Field()
    @Column()
    public user_id: number

    @Field()
    @Column()
    public group_id: number

    // @Field()
    // @Column()
    // user_id: number

    // @Field()
    // @Column()
    // group_id: number

    @Field()
    @Column()
    public is_admin: boolean

    @Field()
    @CreateDateColumn()
    public created_at: string

    @Field()
    @UpdateDateColumn()
    public modified_at: string

    @ManyToOne(() => User, user => user.userToGroups)
    public user: User

    @ManyToOne(() => Group, group => group.userToGroups)
    public group: Group
}

@InputType()
export class NewGroupUserInput {
    @Field()
    group_id: number
    user_id: number
    is_admin: boolean
}

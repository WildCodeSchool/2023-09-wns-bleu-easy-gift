import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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
    public id: number

    @Field()
    @Column()
    public user_id: number

    @Field()
    @Column()
    public group_id: number

    @Field()
    @Column()
    public is_admin: boolean

    @Field()
    @CreateDateColumn()
    public created_at: string

    @Field()
    @UpdateDateColumn()
    public modified_at: string

    @Field(() => User)
    @ManyToOne(() => User, user => user.userToGroups)
    @JoinColumn({ name: 'user_id' })
    public user: User

    //group ne sera pas exposé dans graphQL sur la table de jointure
    // @Field(() => Group)
    @ManyToOne(() => Group, group => group.userToGroups)
    @JoinColumn({ name: 'group_id' })
    public group: Group
}

@InputType()
export class NewGroupUserInput {
    @Field()
    group_id: number
    user_id: number
    is_admin: boolean
}

import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { User } from './user'
import { Group } from './group'

@Entity()
@ObjectType()
export class Avatar extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number

    @Column({ length: 30 })
    @Field()
    name: string

    @Column()
    @Field()
    type: string

    @Column()
    @Field()
    url: string

    @OneToMany(() => User, user => user.avatar)
    users: User[]

    @OneToMany(() => Group, group => group.avatar)
    groups: Group[]
}

import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { Length } from 'class-validator'
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
    @Length(3, 30, {
        message: "Le nom de l'avatar doit contenir entre 3 and 30 caractères",
    })
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

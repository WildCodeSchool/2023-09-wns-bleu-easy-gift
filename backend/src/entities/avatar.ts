import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { User } from './user'
import { Group } from './group'

export type AvatarType = "generic" | "profil"


@Entity()
@ObjectType()
export class Avatar extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number

    @Column({ length: 30 })
    @Field()
    @Length(3, 50, {
        message: 'Le nom du groupe doit contenir entre 3 et 50 caractères',
    })
    name: string

    @Column({
        type: "enum",
        enum: ["generic", "profil"]
    })
    @Field()
    type: AvatarType

    @Column()
    @Field()
    url: string

    @OneToMany(() => User, user => user.avatar)
    users: User[]

    @OneToMany(() => Group, group => group.avatar)
    groups: Group[]
}

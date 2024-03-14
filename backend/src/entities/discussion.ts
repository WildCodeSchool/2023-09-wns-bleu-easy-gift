import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Group } from './group'

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
}

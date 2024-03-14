import { Field, Int, ObjectType } from 'type-graphql'
import { User } from './user'
import { Discussion } from './discussion'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Message extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 500, type: 'text' })
    content: string

    @ManyToOne(() => User, user => user.messages, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field()
    user: User

    @ManyToOne(() => Discussion, discussion => discussion.messages, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    discussion: Discussion

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string
}

import { Field, InputType, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Message extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({length: 500, type: "text"})
  content: string


  @ManyToOne(() => User, (user) => user.id)
  @Field()
  user_id: User ;


  @ManyToOne(() => Discussion, (discussion) => discussion.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  discussion_id: Discussion ;

  @Field()
  @Column()
  created_at: Date ;

  @Field()
  @Column()
  modified_at: Date ;

}

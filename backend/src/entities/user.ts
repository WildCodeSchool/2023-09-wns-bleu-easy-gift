import { Field, InputType, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import * as argon2 from 'argon2'

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @BeforeInsert()
    protected async hashPassword() {
        this.password = await argon2.hash(this.password)
    }
    @Field(() => Int)
    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column({ unique: true })
    email: string

    @Column({ length: 50 })
    @Field()
    pseudo: string

    // @Field()
    @Column()
    password: string

    @Field()
    @Column()
    birthday: Date

    @Field()
    @Column()
    validated_email: Date

    @ManyToOne(() => Avatar, avatar => avatar.users, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field()
    avatar: Avatar

    @ManyToMany(() => Discussion, discussion => discussion.users, {
        cascade: true,
    })
    @Field(() => [Discussion])
    discussions: Discussion[]

    @OneToMany(() => Message, message => message.user)
    messages: Message[]

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string
}

@InputType()
export class InputRegister {
    @Field()
    pseudo: string

    @Field()
    email: string

    @Field()
    password: string
}

@ObjectType()
export class UserWithoutPassword {
    // @Field()
    // id: string

    @Field()
    email: string

    @Field()
    pseudo: string
}

@InputType()
export class InputLogin {
    @Field()
    email: string

    @Field()
    password: string
}

@ObjectType()
export class ResponseMessage {
    @Field()
    success: boolean

    @Field()
    message: string
}

@ObjectType()
export class UserInfos {
    @Field()
    id: string

    @Field()
    email: string

    @Field()
    pseudo: string
}

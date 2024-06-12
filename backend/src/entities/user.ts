import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { Avatar } from './avatar'
import { Discussion } from './discussion'
import { Message } from './message'
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
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
import { UserToGroup } from './userToGroup'
import { ObjectId } from '../utils'

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @BeforeInsert()
    @BeforeUpdate()
    protected async hashPassword() {
        if (!this.password.startsWith('$argon2')) {
            this.password = await argon2.hash(this.password)
        }
    }
    @Field(() => Int)
    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    email: string

    @Column({ length: 50 })
    @Field()
    pseudo: string

    // @Field()
    @Column()
    password: string

    @Field(() => Date, { nullable: true })
    @Column({ default: null, type: 'date' })
    birthday?: Date

    // @Field()
    // @Column({ nullable: true })
    // validated_email: Date

    @Column({ default: null, type: 'date', nullable: true })
    @Field(() => Date, { nullable: true })
    validated_email: Date | null

    @ManyToOne(() => Avatar, avatar => avatar.users, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => Avatar, { nullable: true })
    avatar: Avatar | null

    @ManyToMany(() => Discussion, discussion => discussion.users)
    @Field(() => [Discussion])
    discussions: Discussion[]

    @OneToMany(() => Message, message => message.user)
    messages: Message[]

    @OneToMany(() => UserToGroup, userToGroup => userToGroup.user)
    public userToGroups: UserToGroup[]

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string

    // @Field(() => String, { nullable: true })
    @Column({ nullable: true, type: 'varchar', unique: true })
    token: string | null
}

@InputType()
export class InputRegister {
    @Field({ nullable: true })
    pseudo: string

    @Field()
    email: string

    @Field()
    password: string

    @Field(() => ObjectId, { nullable: true })
    avatar?: Avatar | null
}

@ObjectType()
export class UserWithoutPassword {
    @Field()
    email: string

    @Field()
    pseudo: string
}

@ObjectType()
export class UserWithoutPasswordAvatar {
    @Field()
    email: string

    @Field()
    pseudo: string

    @Field()
    avatar: Avatar
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

    @Field(() => Avatar, { nullable: true })
    avatar?: Avatar | null
}

@InputType()
export class InputRegistrationWithToken {
    @Field()
    pseudo: string

    @Field()
    password: string

    @Field()
    token: string
}

@InputType()
export class InputUpdateUser {
    @Field({ nullable: true })
    pseudo?: string

    @Field({ nullable: true })
    email?: string
}

@InputType()
export class InputUpdateAvatar {
    @Field(() => Int)
    avatarId: number
}

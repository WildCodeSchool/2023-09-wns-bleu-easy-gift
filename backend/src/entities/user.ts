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
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import * as argon2 from 'argon2'
import { UserToGroup } from './userToGroup'
import { ObjectId } from '../utils'
import { IsDateString, IsEmail, Length } from 'class-validator'

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

    // @ManyToMany(() => Discussion, discussion => discussion.users)
    // @Field(() => [Discussion])
    // discussions: Discussion[]

    @OneToMany(() => Message, message => message.user)
    messages: Message[]

    @Field(() => [UserToGroup])
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

    @Field(() => [Discussion])
    @OneToMany(() => Discussion, discussion => discussion.userDiscussion)
    discussions: Discussion[]
}

@InputType()
export class InputRegister {
    @Field({ nullable: true })
    @Length(3, 50, {
        message: 'Le pseudo doit contenir entre 3 et 50 caractères',
    })
    pseudo: string

    @Field()
    @IsEmail(
        {},
        {
            message: 'Une adresse mail valide est requise',
        }
    )
    email: string

    @Field()
    password: string

    @Field(() => ObjectId, { nullable: true })
    avatar?: Avatar | null

    @Field({ nullable: true })
    @IsDateString({}, { message: 'Vérifier la date choisie' })
    birthday?: string
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
    @IsEmail(
        {},
        {
            message: 'Une adresse mail valide est requise',
        }
    )
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

    // @Field(() => [Discussion])
    // discussions: Discussion[]
}

@InputType()
export class InputRegistrationWithToken {
    @Field()
    @Length(3, 50, {
        message: 'Le pseudo doit contenir entre 3 et 50 caractères',
    })
    pseudo: string

    @Field()
    password: string

    @Field()
    token: string
}

@InputType()
export class InputUpdateUser {
    @Field({ nullable: true })
    @Length(3, 50, {
        message: 'Le pseudo doit contenir entre 3 et 50 caractères',
    })
    pseudo?: string

    @Field({ nullable: true })
    @IsEmail(
        {},
        {
            message: 'Une adresse mail valide est requise',
        }
    )
    email?: string
}

@InputType()
export class InputUpdateAvatar {
    @Field(() => Int)
    avatarId: number
}

@InputType()
export class InputUpdatePassword {
    @Field()
    oldPassword: string

    @Field()
    newPassword: string
}

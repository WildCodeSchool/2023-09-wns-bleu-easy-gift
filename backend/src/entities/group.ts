import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Avatar } from './avatar'
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsDateString,
    IsEmail,
    Length,
} from 'class-validator'
import { Discussion } from './discussion'
import { UserToGroup } from './userToGroup'

@ObjectType()
@Entity()
export class Group extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 30 })
    name: string

    @Field()
    @CreateDateColumn()
    created_at: string

    @Field()
    @UpdateDateColumn()
    modified_at: string

    @OneToMany(() => Discussion, discussion => discussion.group)
    discussions: Discussion[]

    @ManyToOne(() => Avatar, avatar => avatar.groups, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => Avatar)
    avatar: Avatar

    @Field({ nullable: true })
    @Column({ default: null })
    event_date?: string

    @Field(() => [UserToGroup])
    @OneToMany(() => UserToGroup, userToGroup => userToGroup.group)
    public userToGroups: UserToGroup[]
}

@InputType()
export class NewGroupInput {
    @Field()
    @Length(3, 50, {
        message: 'Le nom du groupe doit contenir entre 3 et 50 caractères',
    })
    name: string

    @Field(() => [String])
    @ArrayNotEmpty({ message: 'Le groupe doit contenir au moins 3 emails' })
    @ArrayMinSize(3, {
        message: 'Le groupe doit contenir au moins 3 emails',
    })
    @IsEmail(
        {},
        {
            each: true,
            message: 'Le groupe doit contenir des adresses Emails valides',
        }
    )
    emailUsers: string[]

    @Field()
    @IsDateString({}, { message: "La date de l'évenement doit être définie" })
    event_date: string
}

@InputType()
export class UpdateGroupInput {
    @Field({ nullable: true })
    @Length(3, 50, {
        message: 'Le nom du groupe doit contenir entre 3 et 50 caractères',
    })
    name?: string

    @Field({ nullable: true })
    @IsDateString({}, { message: "La date de l'évenement doit être définie" })
    event_date?: string
}

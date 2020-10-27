import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

import { IsEmail } from "class-validator";
import { PersonalData } from "./PersonalData";
import { EmailResetPassToken } from "./EmailResetPassToken";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: false})
  subscription: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @OneToOne((type) => EmailResetPassToken, (email) => email.user) // specify inverse side as a second parameter
  email_sended: EmailResetPassToken;
 
  @OneToOne((type) => PersonalData, (data) => data.user) // specify inverse side as a second parameter
  personal_data: PersonalData;
}

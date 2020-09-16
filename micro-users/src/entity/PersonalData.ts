import {
  Entity,
  Column,
  BaseEntity,
  Unique,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";

import { User } from "./User";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  NOTSPECIFIED = "not_specified",
}

@Entity()
export class PersonalData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  about_me: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  experience: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.NOTSPECIFIED,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  instagram_link: string;

  @Column({ nullable: true })
  facebook_link: string;

  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: User;
}

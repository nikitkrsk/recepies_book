import { Entity, Column, BaseEntity, Unique, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

import { IsNotEmpty } from "class-validator";

import { User } from "./User";

@Entity()
@Unique(["email"])
export class Refresh extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  refresh_token: string;

  @Column()
  email: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User 
}

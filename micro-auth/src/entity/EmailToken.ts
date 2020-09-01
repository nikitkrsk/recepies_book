import { Entity, Column, BaseEntity, Unique, OneToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { IsNotEmpty } from "class-validator";

import { User } from "./User";

@Entity()
@Unique(["email"])
export class EmailToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  token: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => User)
  @JoinColumn()
  user: User 
}

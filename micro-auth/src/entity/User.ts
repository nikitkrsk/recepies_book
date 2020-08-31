import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { IsEmail } from "class-validator";

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
  role: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  status: string;
}

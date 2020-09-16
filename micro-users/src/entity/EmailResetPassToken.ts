import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  
  import { IsNotEmpty } from "class-validator";
  
  import { User } from "./User";
  import { PasswordChangedLog } from "./PasswordChangedLog";
  
  @Entity()
  @Unique(["email"])
  export class EmailResetPassToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    token: string;
  
    @Column()
    email: string;
  
    @Column({ default: false })
    token_used: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(type => PasswordChangedLog, entry => entry.record, {nullable: true})
    entries: PasswordChangedLog[]
  
    @OneToOne((type) => User, (user) => user.email)
    @JoinColumn()
    user: User;
  }
  
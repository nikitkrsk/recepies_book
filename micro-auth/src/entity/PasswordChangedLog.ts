import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
  } from "typeorm";
  import { EmailResetPassToken } from "./EmailResetPassToken";
  
  @Entity()
  export class PasswordChangedLog {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    email: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    
    @ManyToOne(type => EmailResetPassToken, record => record.entries)
    record: EmailResetPassToken
  }
  
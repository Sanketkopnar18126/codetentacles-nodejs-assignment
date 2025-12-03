
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  mobileNo!: string;

  @Column()
  country!: string;

  @Column()
  state!: string;

  @Column("simple-array") 
  skills!: string[];

  @Column()
  password!: string;

  @Column({ default: "seller" })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

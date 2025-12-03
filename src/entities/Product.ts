import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Seller } from "./Seller";
import { Brand } from "./Brand";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Seller, { onDelete: "CASCADE" })
  seller!: Seller;

  @Column()
  productName!: string;

  @Column({ type: "text", nullable: true })
  productDescription!: string;

  @OneToMany(() => Brand, (brand) => brand.product, {
    cascade: true,
  })
  brands!: Brand[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

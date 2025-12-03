import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  brandName!: string;

  @Column({ type: "text", nullable: true })
  detail!: string;

  @Column({ nullable: true })
  image!: string;

  @Column("float")
  price!: number;

  @ManyToOne(() => Product, (product) => product.brands, {
    onDelete: "CASCADE",
  })
  product!: Product;
}

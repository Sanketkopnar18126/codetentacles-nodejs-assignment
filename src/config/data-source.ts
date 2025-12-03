import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "../entities/Admin";
import { Seller } from "../entities/Seller";
import { Product } from "../entities/Product";
import { Brand } from "../entities/Brand";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite", 
  synchronize: true,           
  logging: false,
  entities: [Admin,Seller,Product,Brand]
});
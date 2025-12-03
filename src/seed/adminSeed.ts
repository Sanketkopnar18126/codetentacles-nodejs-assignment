import "reflect-metadata";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";

 export async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Admin);

  const existing = await repo.findOne({ where: { email: "admin@example.com" }});
  debugger
  if (existing) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = repo.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword
  });

  await repo.save(admin);

  // console.log("Admin created: admin@example.com / admin123");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";
import { Seller } from "../entities/Seller";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log("Dta",email)
    // debugger
    const adminRepo = AppDataSource.getRepository(Admin);

    const admin = await adminRepo.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: admin.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createSeller = async (req: Request, res: Response) => {
  try {
    // debugger;
    const { name, email, mobileNo, country, state, skills, password } =
      req.body;

    if (
      !name ||
      !email ||
      !mobileNo ||
      !country ||
      !state ||
      !skills ||
      !password
    ) {
      const requiredFields = [
        "name",
        "email",
        "mobileNo",
        "country",
        "state",
        "skills",
        "password",
      ];

      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required field(s): ${missingFields.join(", ")}`,
        });
      }
    }

    const sellerRepo = AppDataSource.getRepository(Seller);
    const existing = await sellerRepo.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = sellerRepo.create({
      name,
      email,
      mobileNo,
      country,
      state,
      skills,
      password: hashedPassword,
      role: "seller" 
    });

    await sellerRepo.save(seller);

    return res.status(201).json({ message: "Seller created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listSellers = async (req: Request, res: Response) => {
  try {
    // debugger
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const sellerRepo = AppDataSource.getRepository(Seller);



    const [sellers, total] = await sellerRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
      select: ["id", "name", "email", "mobileNo", "country", "state", "role","skills"]
    });
    

    return res.status(200).json({
      page,
      limit,
      total,
      data: sellers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

import { AppDataSource } from "../config/data-source";
import { Seller } from "../entities/Seller";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginSeller = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
// debugger
    const sellerRepo = AppDataSource.getRepository(Seller);
    const seller = await sellerRepo.findOne({ where: { email } });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: seller.id, email: seller.email, role: seller.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
     role: seller.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
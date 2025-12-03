import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const sellerAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    debugger
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    req.user = decoded; 
    if (req.user.role !== "seller")
      return res.status(403).json({ message: "Not a seller" });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
 }
    



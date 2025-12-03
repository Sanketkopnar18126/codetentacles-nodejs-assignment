import { Router } from "express";
import { createSeller, listSellers, loginAdmin } from "../controllers/adminController";


const router = Router();

router.post("/login",loginAdmin)
router.post("/create-seller", createSeller);
router.get("/sellers", listSellers);



export default router
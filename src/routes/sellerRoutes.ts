import { Router } from "express";
import { sellerAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { addProduct, deleteProduct, listSellerProducts } from "../controllers/productController";
import { loginSeller } from "../controllers/sellerController";


const router = Router();

router.get("/products", sellerAuth, listSellerProducts);
router.post("/login-seller",loginSeller)
router.post(
  "/add-product",
  sellerAuth,
 upload.any(),
  addProduct
);
router.delete("/product/:id", sellerAuth, deleteProduct);
export default router;

import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";
import { Brand } from "../entities/Brand";
import { Seller } from "../entities/Seller";
import { AuthRequest } from "../middlewares/auth";
import { sanitizeBrand, sanitizeSeller } from "../utills/sanitize";


export const addProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { productName, productDescription } = req.body;
// debugger
    if (!productName || !productDescription) {
      return res.status(400).json({ message: "Product name & description required" });
    }

    // Parse brands (it will be sent as JSON string)
    const brandsData = JSON.parse(req.body.brands);

    if (!Array.isArray(brandsData) || brandsData.length === 0) {
      return res.status(400).json({ message: "Brands array required" });
    }

    const sellerRepo = AppDataSource.getRepository(Seller);
    const productRepo = AppDataSource.getRepository(Product);
    const brandRepo = AppDataSource.getRepository(Brand);

    // seller from token
    const seller = await sellerRepo.findOne({ where: { id: req.user.id } });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    // Create product
    const product = new Product();
    product.productName = productName;
    product.productDescription = productDescription;
    product.seller = seller;
    product.brands = [];

    // Process brands + images
    brandsData.forEach((b, index) => {
      const brand = new Brand();
      brand.brandName = b.brandName;
      brand.detail = b.detail;
      brand.price = b.price;

      // Image field name must be brandImage0, brandImage1 ... etc
      const files = req.files as Express.Multer.File[];
        if (files[index]) brand.image = files[index].filename;

      product.brands.push(brand);
    });

    await productRepo.save(product);

    return res.status(201).json({
      message: "Product added successfully",
      product: {
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        seller: sanitizeSeller(seller),
        brands: product.brands.map(sanitizeBrand)
      }
    });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listSellerProducts = async (req: any, res: Response) => {
  try {
    debugger
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const sellerId = req.user.id;

    const productRepo = AppDataSource.getRepository(Product);

    const [products, total] = await productRepo.findAndCount({
      where: { seller: { id: sellerId } },
      relations: ["brands", "seller"],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
    });

    const result = products.map((p) => ({
      id: p.id,
      productName: p.productName,
      productDescription: p.productDescription,
      seller: sanitizeSeller(p.seller),
      brands: p.brands.map(sanitizeBrand),
    }));

    return res.status(200).json({
      page,
      limit,
      total,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    // debugger
    const productId = parseInt(req.params.id);
    const sellerId = req.user.id; 

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const productRepo = AppDataSource.getRepository(Product);

    // Find the product and check seller ownership
    const product = await productRepo.findOne({
      where: { id: productId },
      relations: ["seller"], // get seller info
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.id !== sellerId) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    // Delete product
    await productRepo.remove(product);

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


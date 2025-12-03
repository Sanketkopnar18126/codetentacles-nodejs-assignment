import { Seller } from "../entities/Seller";
import { Brand } from "../entities/Brand";

export const sanitizeSeller = (seller: Seller) => ({
  id: seller.id,
  name: seller.name,
  email: seller.email,
  mobileNo: seller.mobileNo,
  country: seller.country,
  state: seller.state,
  skills: seller.skills,
  role: seller.role,
});

export const sanitizeBrand = (brand: Brand) => ({
  id: brand.id,
  brandName: brand.brandName,
  detail: brand.detail,
  price: brand.price,
  image: brand.image,
});

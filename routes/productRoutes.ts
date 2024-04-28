import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  getProductsByBrandId,
  createNewProduct,
  getNewArrivals,
  getHandPickedProducts,
  getLimitedEditionProducts,
  getOnSaleProducts,
  getPopularProducts,
  filterProductsWithSearch,
} from "../controllers/productController";

const router = express.Router();

router.get("/products/new-arrivals", getNewArrivals);
router.get("/products/handpicked", getHandPickedProducts);
router.get("/products/limited-edition", getLimitedEditionProducts);
router.get("/products/on-sale", getOnSaleProducts);
router.get("/products/popular", getPopularProducts);

router.get("/products", getAllProducts);
router.get("/products/category/:id", getProductsByCategoryId);
router.get("/products/brand/:id", getProductsByBrandId);
router.get("/products/search/:query", filterProductsWithSearch);

router.get("/products/:id", getProductById);
router.post("/products", createNewProduct);

export default router;

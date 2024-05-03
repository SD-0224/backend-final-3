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
  getHandPickedProductsByCategory,
} from "../controllers/productController";
import { isAuthorized } from "../middleware/auth";

const router = express.Router();

router.get("/new-arrivals", getNewArrivals);
router.get("/handpicked", getHandPickedProducts);
router.get("/handpicked/:categoryId", getHandPickedProductsByCategory);
router.get("/limited-edition", getLimitedEditionProducts);
router.get("/on-sale", getOnSaleProducts);
router.get("/popular", getPopularProducts);
router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategoryId);
router.get("/brand/:id", getProductsByBrandId);
router.get("/search/:query", filterProductsWithSearch);
router.get("/:id", getProductById);
router.post("/",[isAuthorized], createNewProduct);

export default router;

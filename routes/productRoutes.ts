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
  getHandPickedProductsByCategory
} from "../controllers/productController";

const router = express.Router();

<<<<<<< HEAD
router.get("/products/new-arrivals", getNewArrivals);
router.get("/products/handpicked", getHandPickedProducts);
router.get("/products/handpicked/:categoryId", getHandPickedProductsByCategory);
router.get("/products/limited-edition", getLimitedEditionProducts);
router.get("/products/on-sale", getOnSaleProducts);
router.get("/products/popular", getPopularProducts);
=======
router.get("/new-arrivals", getNewArrivals);
router.get("/handpicked", getHandPickedProducts);
router.get("/limited-edition", getLimitedEditionProducts);
router.get("/on-sale", getOnSaleProducts);
router.get("/popular", getPopularProducts);
>>>>>>> 328f73675358898886482bc382f3f45d9be656a4

router.get("/", getAllProducts);
router.get("/category/:id", getProductsByCategoryId);
router.get("/brand/:id", getProductsByBrandId);
router.get("/search/:query", filterProductsWithSearch);

router.get("/:id", getProductById);
router.post("/", createNewProduct);

export default router;

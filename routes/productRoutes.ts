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
  uploadProductImage,
} from "../controllers/productController";
import { isAuthorized } from "../middleware/auth";
import upload from "../utils/imageUpload"

const router = express.Router();
/**
 * @swagger
 * /api/products/new-arrivals:
 *   get:
 *     summary: Get new arrivals products.
 *     description: Retrieve a list of products that have been added within the last three months.
 *     responses:
 *       '200':
 *         description: A list of new arrivals products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products found as new arrivals.
 *       '500':
 *         description: Internal server error.
 */
router.get("/new-arrivals", getNewArrivals);
/**
 * @swagger
 * /api/products/handpicked:
 *   get:
 *     summary: Get handpicked products.
 *     description: Retrieve a list of handpicked products with an average rating of 4.5 or higher and a price less than $100.
 *     responses:
 *       '200':
 *         description: A list of handpicked products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No handpicked products found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/handpicked", getHandPickedProducts);
/**
 * @swagger
 * /api/products/handpicked/{categoryId}:
 *   get:
 *     summary: Get handpicked products by category.
 *     description: Retrieve a list of handpicked products within a specific category with an average rating of 4.5 or higher and a price less than $100.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to filter handpicked products.
 *     responses:
 *       '200':
 *         description: A list of handpicked products within the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No handpicked products found for the specified category.
 *       '500':
 *         description: Internal server error.
 */
router.get("/handpicked/:categoryId", getHandPickedProductsByCategory);
/**
 * @swagger
 * /api/products/limited-edition:
 *   get:
 *     summary: Get limited edition products.
 *     description: Retrieve a list of limited edition products with a quantity less than 20.
 *     responses:
 *       '200':
 *         description: A list of limited edition products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No limited edition products found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/limited-edition", getLimitedEditionProducts);
/**
 * @swagger
 * /api/products/on-sale:
 *   get:
 *     summary: Get products on sale.
 *     description: Retrieve a list of products on sale with a discount percentage greater than or equal to 15%.
 *     responses:
 *       '200':
 *         description: A list of products on sale.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products on sale found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/on-sale", getOnSaleProducts);
/**
 * @swagger
 * /api/products/popular:
 *   get:
 *     summary: Get popular products.
 *     description: Retrieve a list of popular products with an average rating of 4.5 or higher.
 *     responses:
 *       '200':
 *         description: A list of popular products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No popular products found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/popular", getPopularProducts);
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products.
 *     description: Retrieve a list of all products.
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllProducts);
/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category ID.
 *     description: Retrieve a list of products based on the provided category ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to filter products.
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products found for the given category ID.
 *       '500':
 *         description: Internal server error.
 */
router.get("/category/:id", getProductsByCategoryId);
/**
 * @swagger
 * /api/products/brand/{brandId}:
 *   get:
 *     summary: Get products by brand ID.
 *     description: Retrieve a list of products based on the provided brand ID.
 *     parameters:
 *       - in: path
 *         name: brandId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the brand to filter products.
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products found for the given brand ID.
 *       '500':
 *         description: Internal server error.
 */

router.get("/brand/:id", getProductsByBrandId);
/**
 * @swagger
 * /api/products/search/{query}:
 *   get:
 *     summary: Filter products with search query.
 *     description: Retrieve a list of products that match the search query.
 *     parameters:
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query.
 *     responses:
 *       '200':
 *         description: A list of products matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: No products found matching the search query.
 *       '500':
 *         description: Internal server error.
 */

router.get("/search/:query", filterProductsWithSearch);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID.
 *     description: Retrieve a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: A product object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getProductById);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product.
 *     description: Create a new product with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       '200':
 *         description: A new product object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request, validation error.
 *       '500':
 *         description: Internal server error.
 */

router.post("/", [isAuthorized], createNewProduct);
router.post("/:productId/images",[isAuthorized,upload.array('images')], uploadProductImage);

export default router;

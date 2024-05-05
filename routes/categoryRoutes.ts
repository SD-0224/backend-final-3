import express from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/categoryController";

const router = express.Router();
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories with associated brands.
 *     description: Retrieve all categories along with the brands associated with each category.
 *     responses:
 *       '200':
 *         description: A list of categories with associated brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryWithBrands'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllCategories);
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID with associated brands.
 *     description: Retrieve a category by its ID along with the brands associated with it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A category with associated brands.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryWithBrands'
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getCategoryById);

export default router;

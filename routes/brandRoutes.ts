import express from "express";
import { getAllBrands, getBrandById } from "../controllers/brandController";

const router = express.Router();

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands.
 *     description: Retrieve all brands available in the database.
 *     responses:
 *       '200':
 *         description: A list of brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllBrands);
/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID.
 *     description: Retrieve a brand by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The brand object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       '404':
 *         description: Brand not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getBrandById);

export default router;

import express from "express";
import {
  getAllReviews,
  createNewReview,
  getReviewById,
  getUserReviews,
  getProductReviews,
} from "../controllers/reviewController";
import { isAuthorized } from "../middleware/auth";

const router = express.Router();
/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve a list of all reviews.
 *     responses:
 *       '200':
 *         description: A successful response with a list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllReviews);
/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review for a specific product.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the review
 *               rating:
 *                 type: number
 *                 description: The rating of the review
 *             required:
 *               - content
 *               - rating
 *     responses:
 *       '200':
 *         description: A successful response with the created review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 */
router.post("/product/:productId", [isAuthorized], createNewReview);
/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     description: Retrieve a review by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the review details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Review not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getReviewById);
/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by user ID
 *     description: Retrieve reviews written by a user based on their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with a list of reviews written by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404':
 *         description: User has no reviews yet.
 *       '500':
 *         description: Internal server error.
 */
router.get("/user/:userId", getUserReviews);
/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Get reviews by product ID
 *     description: Retrieve reviews for a product based on its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with a list of reviews for the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Product has no reviews yet.
 *       '500':
 *         description: Internal server error.
 */
router.get("/product/:productId", getProductReviews);

export default router;

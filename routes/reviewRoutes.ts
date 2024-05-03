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

router.get("/", getAllReviews);
router.post("/product/:productId", [isAuthorized], createNewReview);
router.get("/:id", getReviewById);
router.get("/user/:userId", getUserReviews);
router.get("/product/:productId", getProductReviews);

export default router;

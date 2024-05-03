import { Request, Response } from "express";
import db from "../models";
import { reviewSchema } from "../utils/validators";

// This method returns all reviews
const getAllReviews = async (req: Request, res: Response) => {
  db.Review.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } })
    .then((reviews: any) => {
      res.json(reviews);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};

// This method create a new review by an authorized user
const createNewReview = async (req: Request, res: Response) => {
  try {
    const { error, value } = await reviewSchema.validateAsync(req.body);
  } catch (error: any) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { content, rating } = req.body;
    const productId = req.params.productId;

    const newReview = await db.Review.create({
      content,
      rating,
      productId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.json(newReview);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// This method returns a specific review by Id
const getReviewById = async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  db.Review.findByPk(reviewId, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((review: any) => {
      if (!review) {
        res.status(404).json({ error: "Review not found" });

        return;
      }
      res.json(review);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method returns all reviews for a specific user Id
const getUserReviews = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  db.Review.findAll({
    where: { userId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((userReviews: any) => {
      if (userReviews.length < 1) {
        res.status(404).json({ error: "This user has no reviews yet" });

        return;
      }
      res.json(userReviews);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method returns all reviews for a specific product Id
const getProductReviews = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  db.Review.findAll({
    where: { productId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((productReviews: any) => {
      if (productReviews.length < 1) {
        res.status(404).json({ error: "This product has no reviews yet" });

        return;
      }
      res.json(productReviews);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

export {
  getAllReviews,
  createNewReview,
  getReviewById,
  getUserReviews,
  getProductReviews,
};

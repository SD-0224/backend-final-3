import express from "express";
import {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
} from "../controllers/orderController";

const router = express.Router();
router.get("/", getAllOrders);
router.get("/user/:id", getOrderByUserId);
router.get("/:id", getOrderById);

export default router;

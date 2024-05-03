import express from "express";
import {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  createOrderAddress,
} from "../controllers/orderController";
import { isAuthorized } from "../middleware/auth";

const router = express.Router();
router.get("/", getAllOrders);
router.get("/user/:id", getOrderByUserId);
router.get("/:id", getOrderById);
router.post("/address", [isAuthorized], createOrderAddress);

export default router;

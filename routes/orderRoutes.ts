import express from "express";
import {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  createOrderAddress,
} from "../controllers/orderController";
import { isAuthorized } from "../middleware/auth";

const router = express.Router();
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders.
 *     description: Retrieve a list of all orders.
 *     responses:
 *       '200':
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '404':
 *         description: No orders found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", getAllOrders);
/**
 * @swagger
 * /api/orders/user/{id}:
 *   get:
 *     summary: Get orders by user ID.
 *     description: Retrieve a list of orders placed by a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of orders placed by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '404':
 *         description: No orders found for the user.
 *       '500':
 *         description: Internal server error.
 */
router.get("/user/:id", getOrderByUserId);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID.
 *     description: Retrieve an order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The requested order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order was not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getOrderById);
/**
 * @swagger
 * /api/orders/address:
 *   post:
 *     summary: Create order address.
 *     description: Create a new address for an order.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       '200':
 *         description: The created address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       '400':
 *         description: Bad request. Invalid address data provided.
 *       '500':
 *         description: Internal server error.
 */
router.post("/address", [isAuthorized], createOrderAddress);

export default router;

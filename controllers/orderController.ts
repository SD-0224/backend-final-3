import { Request, Response } from "express";
import db from "../models";
import { error } from "console";
import sequelize from "sequelize";

// This method returns all users
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.Order.findAll({
      attributes: {
        exclude: ["updatedAt", "addressId"],
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: [
            "id",
            "title",
            "shortSubtitle",
            "description",
            "price",
            "discountPercentage",
            [
              sequelize.literal(
                `(SELECT smallImageUrl FROM productImages WHERE productImages.productId = products.id LIMIT 1)`
              ),
              "smallImageUrl",
            ],
            [sequelize.literal("FLOOR(1 + (RAND() * 4))"), "orderQuantity"], // Generates a random number between 1 and 5
          ],
          through: { attributes: [] },
        },
        {
          model: db.Address,
          as: "address",
        },
      ],
    });

    if (!orders.length) {
      res.status(404).json({ error: "No orders found" });
      return;
    }

    res.json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const order = await db.Order.findByPk(orderId, {
      attributes: {
        exclude: ["updatedAt", "addressId"],
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: [
            "id",
            "title",
            "shortSubtitle",
            "description",
            "price",
            "discountPercentage",
            [
              sequelize.literal(
                `(SELECT smallImageUrl FROM productImages WHERE productImages.productId = products.id LIMIT 1)`
              ),
              "smallImageUrl",
            ],
            [sequelize.literal("FLOOR(1 + (RAND() * 4))"), "orderQuantity"],
          ],
          through: { attributes: [] },
        },
        {
          model: db.Address,
          as: "address",
        },
      ],
    });

    if (!order) {
      res.status(404).json({ error: "Order was not found" });
      return;
    }

    res.json(order);
  } catch (error: any) {
    console.error("Error fetching order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const getOrderByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const orders = await db.Order.findAll({
      where: { userId },
      attributes: {
        exclude: ["updatedAt", "addressId"],
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: [
            "id",
            "title",
            "shortSubtitle",
            "description",
            "price",
            "discountPercentage",
            [
              sequelize.literal(
                `(SELECT smallImageUrl FROM productImages WHERE productImages.productId = products.id LIMIT 1)`
              ),
              "smallImageUrl",
            ],
            [sequelize.literal("FLOOR(1 + (RAND() * 4))"), "orderQuantity"],
          ],
          through: { attributes: [] },
        },
        {
          model: db.Address,
          as: "address",
        },
      ],
    });

    if (!orders.length) {
      res.status(404).json({ error: "No orders found for the user" });
      return;
    }

    res.json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export { getAllOrders, getOrderById, getOrderByUserId };

import { Request, Response } from "express";
import db from "../models";
import { error } from "console";
import sequelize from "sequelize";
import { addressSchema } from "../utils/validators";

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
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const createOrderAddress = async (req: Request, res: Response) => {
  try {
    const { error, value } = await addressSchema.validateAsync(req.body);
  } catch (error: any) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { fullName, pinCode, city, state, streetAddress, mobileNumber } =
      req.body;

    const userId = req.user.id;

    const addressExists = await db.Address.findOne({
      where: {
        mobileNumber,
      },
    });
    if (addressExists) {
      return res
        .status(400)
        .send(
          "The mobile Address you're trying to enter is already used for a different Address"
        );
    }

    const newAdress = await db.Address.create({
      fullName,
      pinCode,
      city,
      userId,
      state,
      streetAddress,
      mobileNumber,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.json(newAdress);
  } catch {
    res.status(500).json({ error: "Internal server error" });
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
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export { getAllOrders, getOrderById, getOrderByUserId, createOrderAddress };

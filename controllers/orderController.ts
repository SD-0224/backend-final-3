import { Request, Response } from "express";
import db from "../models";
import { error } from "console";

// This method returns all users
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.Order.findAll({
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: ["id", "quantity"],
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

    res.json(
      orders.map((order: any) => {
        const plainOrder = order.get({ plain: true });
        const normalizedOrder = {
          id: plainOrder.id,
          userId: plainOrder.userId,
          products: plainOrder.products.map((product: any) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
          date: Date.now(),
          category: plainOrder.category,
          status: plainOrder.status,
          address: plainOrder.address,
        };

        return normalizedOrder;
      })
    );
  } catch (error: any) {
    // tslint:disable-next-line:no-console
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
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: ["id", "quantity"],
        },
        {
          model: db.Address,
          as: "address",
        },
      ],
    });

    if (!order) {
      // Check if order is null
      res.status(404).json({ error: "Order was not found" });
      return;
    }

    // Normalize the order data
    const plainOrder = order.get({ plain: true });
    const normalizedOrder = {
      id: plainOrder.id,
      userId: plainOrder.userId,
      products: plainOrder.products.map((product: any) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      date: Date.now(),
      category: plainOrder.category,
      status: plainOrder.status,
      address: plainOrder.address,
    };

    res.json(normalizedOrder); // Send the normalized order data
  } catch (error: any) {
    // tslint:disable-next-line:no-console
    console.error("Error fetching order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const getOrderByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id; // Assuming userId is passed as a parameter in the request

  try {
    // Fetch orders associated with the given userId
    const orders = await db.Order.findAll({
      where: { userId }, // Filter orders by userId
      attributes: {
        exclude: ["updatedAt"], // Exclude updatedAt from the result
      },
      include: [
        {
          model: db.Product,
          as: "products",
          attributes: ["id", "quantity"], // Include only id and quantity of products
        },
        {
          model: db.Address,
          as: "address",
        },
      ],
    });

    if (!orders.length) {
      // If no orders found for the user
      return res.status(404).json({ error: "No orders found for the user" });
    }

    // Normalize the order data and send as response
    const normalizedOrders = orders.map((order: any) => {
      const plainOrder = order.get({ plain: true });
      return {
        id: plainOrder.id,
        userId: plainOrder.userId,
        products: plainOrder.products.map((product: any) => ({
          productId: product.id,
          quantity: product.quantity,
        })),
        date: Date.now(), // Assuming you want to set the current date for each order
        category: plainOrder.category,
        status: plainOrder.status,
        address: plainOrder.address,
      };
    });

    res.json(normalizedOrders); // Send the normalized orders data
  } catch (error: any) {
    // tslint:disable-next-line:no-console
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export { getAllOrders, getOrderById, getOrderByUserId };

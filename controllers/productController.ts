import { Request, Response } from "express";
import db from "../models";
import { Op, fn, col, literal } from "sequelize";
import { subMonths } from "date-fns";
// This method returns all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.Product.findAll({ raw: true });
    res.json({ products });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error("Error retrieving all products:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// This method returns a specific product by ID
const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  db.Product.findByPk(productId)
    .then((product: any) => {
      if (!product) {
        res.status(404).json({ error: "product not found" });
        return;
      }
      res.json({ product });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error finding product:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method returns all products for a specific category ID
const getProductsByCategoryId = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  db.Product.findAll({ where: { categoryId } })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res
          .status(404)
          .json({ error: "No products found for the given category ID" });
        return;
      }
      res.json({ products });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error finding products by category ID:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method returns all products for a specific brand ID
const getProductsByBrandId = async (req: Request, res: Response) => {
  const brandId = req.params.id;

  db.Product.findAll({ where: { brandId } })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res
          .status(404)
          .json({ error: "No products found for the given brand ID" });
        return;
      }
      res.json({ products });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error finding products by brand ID:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method creates a new product
const createNewProduct = async (req: Request, res: Response) => {
  return;
};
const getNewArrivals = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const threeMonthsAgo = currentDate.setMonth(currentDate.getMonth() - 3);

  db.Product.findAll({
    where: {
      createdAt: {
        [Op.gt]: threeMonthsAgo,
      },
    },
  })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res.status(404).json({ message: "No new arrival products found." });
        return;
      }
      res.json({ products });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error retrieving new arrival products:", error);
      res.status(500).json({ error: "Database error", details: error.message });
    });
};
const getHandPickedProducts = (req: Request, res: Response): void => {
  db.Product.findAll({
    include: [
      {
        model: db.Review,
        as: "Reviews",
        attributes: [],
      },
    ],
    where: {
      price: {
        [Op.lt]: 100,
      },
    },
    group: ["Product.id"],
    having: literal("AVG(`Reviews`.`rating`) > 4.5"),
    attributes: [
      "id",
      "title",
      "shortSubTitle",
      "longSubTitle",
      "description",
      "price",
      "quantity",
      "discountpercentage",
      "createdAt",
      "updatedAt",
      "brandId",
      "cartId",
      "categoryId",
      "wishlistId",
      [fn("AVG", col("`Reviews`.`rating`")), "averageRating"],
    ],
    order: [[fn("AVG", col("`Reviews`.`rating`")), "DESC"]],
    raw: true,
  })
    .then((products: any) => {
      if (products.length === 0) {
        res.status(404).json({ message: "No handpicked products found." });
        return;
      }
      res.json({ products });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error retrieving handpicked products:", error);
      res.status(500).json({ error: "Database error", details: error.message });
    });
};
const getLimitedEditionProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await db.Product.findAll({
      where: {
        quantity: {
          [db.Sequelize.Op.lt]: 20,
        },
      },
    });

    if (products.length === 0) {
      res.status(404).json({ message: "No limited edition products found." });
    } else {
      res.json({ products });
    }
  } catch (error: any) {
    // tslint:disable-next-line:no-console
    console.error("Error retrieving limited edition products:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
const getOnSaleProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await db.Product.findAll({
      where: {
        discountpercentage: {
          [db.Sequelize.Op.gte]: 15,
        },
      },
    });

    if (products.length === 0) {
      res.status(404).json({ message: "No products on sale found." });
    } else {
      res.json({ products });
    }
  } catch (error: any) {
    // tslint:disable-next-line:no-console
    console.error("Error retrieving products on sale:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
const getPopularProducts = (req: Request, res: Response): void => {
  db.Product.findAll({
    include: [
      {
        model: db.Review,
        as: "Reviews",
        attributes: [],
      },
    ],
    group: ["Product.id"],
    having: literal("AVG(`Reviews`.`rating`) >= 4.5"),
    attributes: [
      "id",
      "title",
      "shortSubTitle",
      "longSubTitle",
      "description",
      "price",
      "quantity",
      "discountpercentage",
      "createdAt",
      "updatedAt",
      "brandId",
      "cartId",
      "categoryId",
      "wishlistId",
      [fn("AVG", col("`Reviews`.`rating`")), "averageRating"],
    ],
    order: [[fn("AVG", col("`Reviews`.`rating`")), "DESC"]],
    raw: true,
  })
    .then((popularProducts: any) => {
      if (popularProducts.length === 0) {
        res.status(404).json({ message: "No popular products found." });
        return;
      }
      res.json({ products: popularProducts });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error retrieving popular products:", error);
      res.status(500).json({ error: "Database error", details: error.message });
    });
};

export {
  getAllProducts,
  getProductById,
  getProductsByBrandId,
  getProductsByCategoryId,
  createNewProduct,
  getNewArrivals,
  getHandPickedProducts,
  getLimitedEditionProducts,
  getOnSaleProducts,
  getPopularProducts,
};

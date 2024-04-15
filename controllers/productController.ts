import { Request, Response } from "express";
import db from "../models";

// This method returns all products
const getAllProducts = async (req: Request, res: Response) => {
  db.Product.findAll({ raw: true })
    .then((product: any) => {
      res.json({ product });
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};

// This method returns a specific product by ID
const getProductById = async (req: Request, res: Response) => {
    const productId=req.params.id;
};

// This method returns all products for a specific category ID
const getProductsByCategoryId = async (req: Request, res: Response) => {
  return;
};

// This method returns all products for a specific brand ID
const getProductsByBrandId = async (req: Request, res: Response) => {
  return;
};

// This method creates a new product
const createNewProduct = async (req: Request, res: Response) => {
  return;
};

export {
  getAllProducts,
  getProductById,
  getProductsByBrandId,
  getProductsByCategoryId,
  createNewProduct,
};

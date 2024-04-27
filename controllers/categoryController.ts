import { Request, Response } from "express";
import db from "../models";

// This method returns all categories
const getAllCategories = async (req: Request, res: Response) => {
  db.Category.findAll({ raw: true, attributes: { exclude: ['createdAt','updatedAt'] } })
    .then((categories: any) => {
      res.json(categories);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};


// This method returns a specific category by ID with their brands
const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const category = await db.Category.findByPk(categoryId, {attributes: { exclude: ['createdAt','updatedAt'] },
      include: [
        {
          model: db.Product, as:"products",
          include: { model: db.Brand ,as:"brand"},
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const brands:any={}
    category.products.map((product: any) => {
      brands[product.brand.id]={
        name:product.brand.name,
        image:product.brand.image}
  });
    const categoryWithBrands = {
      ...category.toJSON(),
      brands,
    };
    delete categoryWithBrands.products;
    res.json(categoryWithBrands);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
};

// This method returns all brands
const getAllBrands = async (req: Request, res: Response) => {
  db.Brand.findAll({ raw: true,attributes: { exclude: ['createdAt','updatedAt'] } })
    .then((brands: any) => {
      res.json(brands);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};

// This method returns a specific brand by ID
const getBrandById = async (req: Request, res: Response) => {
  const brandId = req.params.id;
  db.Brand.findByPk(brandId,{attributes: { exclude: ['createdAt','updatedAt'] }})
    .then((brand: any) => {
      if (!brand) {
        res.status(404).json({ error: "Brand not found" });

        return;
      }
      res.json(brand);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

export {
  getAllCategories,
  getCategoryById,
  getAllBrands,
  getBrandById,
};

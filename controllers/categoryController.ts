import { Request, Response } from "express";
import db from "../models";

// This method returns all categories
const getAllCategories = async (req: Request, res: Response) => {
  db.Category.findAll({ raw: true })
    .then((category: any) => {
      res.json({ category });
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};

// This method returns a specific category by ID
const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  db.Category.findByPk(categoryId)
    .then((category: any) => {
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      res.json({category});
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error finding Category:", error);
      res.status(500).json({ error: "Internal server error"});
  });
}

// This method returns all brands for a specific category id
const getCategoryBrands = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const category = await db.Category.findByPk(categoryId, {
      include: [
        {
          model: db.Product,
          include: { model: db.Brand },
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const brands = category.Products.map((product: any) => ({
      id: product.Brand.id,
      name: product.Brand.name,
      image: product.Brand.image,
      createdAt: product.Brand.createdAt,
    }));
    const categoryWithBrands = {
      ...category.toJSON(),
      brands,
    };
    delete categoryWithBrands.Products;
    res.json({ category: categoryWithBrands });
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
};

// This method filters and returns products based on category id and brand id
const filterByCategoryByBrand = async (req: Request, res: Response) => {
  return;
};

// This method returns all brands
const getAllBrands = async (req: Request, res: Response) => {
  db.Brand.findAll({ raw: true })
    .then((brand: any) => {
      res.json({ brand });
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error" });
    });
};

// This method returns a specific brand by ID
const getBrandById = async (req: Request, res: Response) => {
  const brandId = req.params.id;
  db.Brand.findByPk(brandId)
    .then((brand: any) => {
      if (!brand) {
        res.status(404).json({ error: "Brand not found" });

        return;
      }
      res.json({ brand });
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error("Error finding Brand:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export {
  getAllCategories,
  getCategoryById,
  getCategoryBrands,
  filterByCategoryByBrand,
  getAllBrands,
  getBrandById,
};

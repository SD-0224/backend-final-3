import { Request, Response } from "express";
import db from "../models";

// This method returns all brands
const getAllBrands = async (req: Request, res: Response) => {
  db.Brand.findAll({attributes: { exclude: ['createdAt','updatedAt'] } })
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
  getAllBrands,
  getBrandById,
};

import { Request, Response } from "express";
import db from "../models";

// This method returns all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories=await db.Category.findAll({attributes: { exclude: ['createdAt','updatedAt'] },
    include: [
      {
        model: db.Product, as:"products",
        attributes: ["id"] ,
        include: { model: db.Brand ,as:"brand"},
      },
    ], })

    let leftCategory=0;
    let rightCategory=categories.length-1;
    const normalizedCategories:any=[];
    while(leftCategory<=rightCategory) {
      let normalizedCategory:any={};
      const brands:any= {};
      if(leftCategory!==rightCategory) {
        categories[leftCategory].products.map((product:any)=> {
          brands[product.brand.id]={
            name:product.brand.name,
            image:product.brand.image}
        })
        normalizedCategory = {
          ...categories[leftCategory].toJSON(),
          brands,
        };
        delete normalizedCategory.products;
        normalizedCategories.push(normalizedCategory)
        leftCategory++;

        categories[rightCategory].products.map((product:any)=> {
          brands[product.brand.id]={
            name:product.brand.name,
            image:product.brand.image}
        })
         normalizedCategory = {
          ...categories[rightCategory].toJSON(),
          brands,
        };
        delete normalizedCategory.products;
        normalizedCategories.push(normalizedCategory)
        rightCategory--;

        }

        else {
          categories[leftCategory].products.map((product:any)=> {
            brands[product.brand.id]={
              name:product.brand.name,
              image:product.brand.image}
          })
          normalizedCategory = {
            ...categories[leftCategory].toJSON(),
            brands,
          };
          delete normalizedCategory.products;
          normalizedCategories.push(normalizedCategory)
          leftCategory++;
        }

        }

    res.json(normalizedCategories);
    }
    catch (error) {
      res.status(500).json({ error: "Internal server error"});
    }
  }


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

export {
  getAllCategories,
  getCategoryById,

};

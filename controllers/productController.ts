import { Request, Response } from "express";
import db from "../models";
import { Op, fn, col, literal, where } from "sequelize";
import { subMonths } from "date-fns";
import { productSchema } from "../utils/validators";


// This method returns all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.Product.findAll({
      attributes: {
        exclude: ["updatedAt", "wishlistId", "cartId"],
      },
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
    });

    if (!products.length) {
      res.status(404).json({ error: "No products found" });
      return;
    }

    res.json(
      products.map((product: any) => {
        const plainProduct = product.get({ plain: true });
        const normalizedProduct = {
          ...plainProduct,
          reviews: plainProduct.reviews,
          largeImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].largeImageUrl
              : null,
          smallImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].smallImageUrl
              : null,
        };

        delete normalizedProduct.images;

        return normalizedProduct;
      })
    );
  } catch (error: any) {

    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
// This method filters the products based on the search-bar query
const filterProductsWithSearch = async (req: Request, res: Response) => {
  const { query } = req.params;
  try {
    const products = await db.Product.findAll({
      attributes: {
        exclude: ["updatedAt", "wishlistId", "cartId"],
      },
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["smallImageUrl"],
        },
        {
          model: db.Brand,
          as: "brand",
          attributes: ["id"],
        },
      ],
      where: {
        [db.Sequelize.Op.or]: [
          db.Sequelize.where(
            db.Sequelize.fn("lower", db.Sequelize.col("title")),
            "LIKE",
            `%${query.toLowerCase()}%`
          ),
          db.Sequelize.where(
            db.Sequelize.fn("lower", db.Sequelize.col("brand.name")),
            "LIKE",
            `%${query.toLowerCase()}%`
          ),
        ],
      },
    });

    if (!products.length) {
      return res.status(404).json({ error: "No products found" });
    }

    const formattedProducts = products.map((product: any) => {
      const plainProduct = product.get({ plain: true });
      return {
        id: plainProduct.id,
        smallImageUrl:
          plainProduct.images && plainProduct.images.length > 0
            ? plainProduct.images[0].smallImageUrl
            : null,
        title: plainProduct.title,
        shortSubtitle: plainProduct.shortSubtitle,
        createdAt: plainProduct.createdAt,
        reviews: plainProduct.reviews,
        price: plainProduct.price,
        discountPercentage: plainProduct.discountPercentage,
        brandId: plainProduct.brand.id,
      };
    });

    res.json(formattedProducts);
  } catch (error: any) {

    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// This method returns a specific product by ID
const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await db.Product.findByPk(productId, {
      attributes: {
        exclude: ["updatedAt", "wishlistId", "cartId"],
      },
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Normalize the product data
    const normalizedProduct = {
      ...product.get({ plain: true }),
      reviews: product.reviews,
      largeImageUrl:
        product.images && product.images.length > 0
          ? product.images[0].largeImageUrl
          : null,
      smallImageUrl:
        product.images && product.images.length > 0
          ? product.images[0].smallImageUrl
          : null,
    };

    delete normalizedProduct.images;

    res.json(normalizedProduct);
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};

// This method returns all products for a specific category ID
const getProductsByCategoryId = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  db.Product.findAll({
    where: { categoryId },
    attributes: {
      exclude: ["updatedAt", "wishlistId", "cartId"],
    },
    include: [
      {
        model: db.Review,
        as: "reviews",
        attributes: ["userId", "rating", "content"],
      },
      {
        model: db.ProductImage,
        as: "images",
        attributes: ["largeImageUrl", "smallImageUrl"],
      },
    ],
  })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res
          .status(404)
          .json({ error: "No products found for the given category ID" });
        return;
      }

      const normalizedProducts = products.map((product: any) => {
        const plainProduct = product.get({ plain: true });
        const normalizedProduct = {
          ...plainProduct,
          largeImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].largeImageUrl
              : null,
          smallImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].smallImageUrl
              : null,
        };

        delete normalizedProduct.images;

        return normalizedProduct;
      });

      res.json(normalizedProducts);
    })
    .catch((error: any) => {

      res.status(500).json({ error: "Internal server error" });
    });
};

// This method returns all products for a specific brand ID
const getProductsByBrandId = async (req: Request, res: Response) => {
  const brandId = req.params.id;

  db.Product.findAll({
    where: { brandId },
    attributes: {
      exclude: ["updatedAt", "wishlistId", "cartId"],
    },
    include: [
      {
        model: db.Review,
        as: "reviews",
        attributes: ["userId", "rating", "content"],
      },
      {
        model: db.ProductImage,
        as: "images",
        attributes: ["largeImageUrl", "smallImageUrl"],
      },
    ],
  })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res
          .status(404)
          .json({ error: "No products found for the given brand ID" });
        return;
      }

      const normalizedProducts = products.map((product: any) => {
        const plainProduct = product.get({ plain: true });
        const normalizedProduct = {
          ...plainProduct,
          largeImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].largeImageUrl
              : null,
          smallImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].smallImageUrl
              : null,
        };

        delete normalizedProduct.images;

        return normalizedProduct;
      });

      res.json(normalizedProducts);
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// This method creates a new product
const createNewProduct = async (req: Request, res: Response) => {
  try {
    await productSchema.validateAsync(req.body);
  } catch (error: any) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const {
      title,
      longSubtitle,
      description,
      price,
      quantity,
      discountPercentage,
      shortSubtitle,
      brandName,
      categoryName,
    } = req.body;

    const productExists = await db.Product.findOne({
      where: {
        [Op.or]: [{ title }, { longSubtitle }, { shortSubtitle }],
      },
    });
    if (productExists) {
      return res
        .status(400)
        .send(
          "The product you are trying to create already exists with all these properties"
        );
    }
    const newProduct = await db.Product.create({
      title,
      longSubtitle,
      description,
      price,
      quantity,
      discountPercentage,
      shortSubtitle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const newBrand = db.Brand.findOrCreate({
      where: { name: brandName.toLowerCase() },
      defaults: {
        name: brandName,
        image: "imageUrl",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });

    const category = await db.Category.findOne({
      where: { name: categoryName },
    });
    await newProduct.setCategory(category);
    await newProduct.setBrand(newBrand);

    res.status(201).json(newProduct);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
// This method returns all the new Arrival products (products added within the last 3 months)
const getNewArrivals = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const threeMonthsAgo = currentDate.setMonth(currentDate.getMonth() - 3);

  db.Product.findAll({
    where: {
      createdAt: {
        [Op.gt]: threeMonthsAgo,
      },
    },
    attributes: {
      exclude: ["updatedAt", "wishlistId", "cartId"],
    },
    include: [
      {
        model: db.Review,
        as: "reviews",
        attributes: ["userId", "rating", "content"],
      },
      {
        model: db.ProductImage,
        as: "images",
        attributes: ["largeImageUrl", "smallImageUrl"],
      },
    ],
  })
    .then((products: any) => {
      if (!products || products.length === 0) {
        res.status(404).json({ error: "No products found as new Arrivals" });
        return;
      }

      const normalizedProducts = products.map((product: any) => {
        const plainProduct = product.get({ plain: true });
        const normalizedProduct = {
          ...plainProduct,
          largeImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].largeImageUrl
              : null,
          smallImageUrl:
            plainProduct.images && plainProduct.images.length > 0
              ? plainProduct.images[0].smallImageUrl
              : null,
        };

        delete normalizedProduct.images;

        return normalizedProduct;
      });

      res.json(normalizedProducts);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Database error", details: error.message });
    });
};
// This method returns all the handpicked products (products with rating >= 4.5 && price <= 100)
const getHandPickedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await db.Product.findAll({
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
      where: {
        price: {
          [Op.lt]: 100,
        },
      },
      attributes: [
        "id",
        "title",
        "shortSubTitle",
        "longSubTitle",
        "description",
        "price",
        "quantity",
        "discountPercentage",
        "brandId",
        "categoryId",
        "createdAt",
      ],
    });

    const handPickedProducts = products
      .filter((product: any) => {
        const averageRating =
          product.reviews.reduce(
            (acc: any, review: any) => acc + review.rating,
            0
          ) / product.reviews.length;
        return averageRating >= 4.5;
      })
      .map((product: any) => ({
        id: product.id,
        title: product.title,
        shortSubTitle: product.shortSubTitle,
        longSubTitle: product.longSubTitle,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        discountPercentage: product.discountPercentage,
        brandId: product.brandId,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        reviews: product.reviews,
        largeImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].largeImageUrl
            : null,
        smallImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].smallImageUrl
            : null,
      }));

    if (handPickedProducts.length === 0) {
      res.status(404).json({ message: "No handpicked products found." });
    } else {
      res.json(handPickedProducts);
    }
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
// This method returns all the handpicked products for a specific category filtered by category ID (products with rating >= 4.5 && price <= 100)
const getHandPickedProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.categoryId;
  try {
    const products = await db.Product.findAll({
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
      where: {
        categoryId,
        price: {
          [Op.lt]: 100,
        },
      },
      attributes: [
        "id",
        "title",
        "shortSubTitle",
        "longSubTitle",
        "description",
        "price",
        "quantity",
        "discountPercentage",
        "brandId",
        "categoryId",
        "createdAt",
      ],
    });

    const handPickedProducts = products
      .filter((product: any) => {
        const averageRating =
          product.reviews.reduce(
            (acc: any, review: any) => acc + review.rating,
            0
          ) / product.reviews.length;
        return averageRating >= 4.5;
      })
      .map((product: any) => ({
        id: product.id,
        title: product.title,
        shortSubTitle: product.shortSubTitle,
        longSubTitle: product.longSubTitle,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        discountPercentage: product.discountPercentage,
        brandId: product.brandId,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        reviews: product.reviews,
        largeImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].largeImageUrl
            : null,
        smallImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].smallImageUrl
            : null,
      }));

    if (handPickedProducts.length === 0) {
      res.status(404).json({ message: "No handpicked products found." });
    } else {
      res.json(handPickedProducts);
    }
  } catch (error: any) {

    res.status(500).json({ error: "Database error", details: error.message });
  }
};
// This method returns all the Limited-edition products (products that have quantity < 20)
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
      attributes: {
        exclude: ["updatedAt", "wishlistId", "cartId"],
      },
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
    });

    if (!products || products.length === 0) {
      res.status(404).json({ error: "No limited-edition products found." });
      return;
    }

    const normalizedProducts = products.map((product: any) => {
      const plainProduct = product.get({ plain: true });
      const largeImageUrl =
        plainProduct.images.length > 0
          ? plainProduct.images[0].largeImageUrl
          : null;
      const smallImageUrl =
        plainProduct.images.length > 0
          ? plainProduct.images[0].smallImageUrl
          : null;
      delete plainProduct.images;
      return {
        ...plainProduct,
        largeImageUrl,
        smallImageUrl,
      };
    });

    res.json(normalizedProducts);
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
// This method returns all the On-sale Products (products with discount percentage >= 15)
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
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],
      attributes: {
        exclude: ["updatedAt", "wishlistId", "cartId"],
      },
    });

    if (products.length === 0) {
      res.status(404).json({ message: "No products on sale found." });
    } else {
      const normalizedProducts = products.map((product: any) => {
        const plainProduct = product.get({ plain: true });
        const largeImageUrl =
          plainProduct.images.length > 0
            ? plainProduct.images[0].largeImageUrl
            : null;
        const smallImageUrl =
          plainProduct.images.length > 0
            ? plainProduct.images[0].smallImageUrl
            : null;
        delete plainProduct.images;
        return {
          ...plainProduct,
          largeImageUrl,
          smallImageUrl,
        };
      });
      res.json(normalizedProducts);
    }
  } catch (error: any) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};
// This method returns all the Popular Products (products with rating >= 4.5 )
const getPopularProducts = async (req: Request,res: Response): Promise<void> => {
  try {
    const products = await db.Product.findAll({
      include: [
        {
          model: db.Review,
          as: "reviews",
          attributes: ["userId", "rating", "content"],
        },
        {
          model: db.ProductImage,
          as: "images",
          attributes: ["largeImageUrl", "smallImageUrl"],
        },
      ],

      attributes: [
        "id",
        "title",
        "shortSubTitle",
        "longSubTitle",
        "description",
        "price",
        "quantity",
        "discountPercentage",
        "brandId",
        "categoryId",
        "createdAt",
      ],
    });

    const PopularProducts = products
      .filter((product: any) => {
        const averageRating =
          product.reviews.reduce(
            (acc: any, review: any) => acc + review.rating,
            0
          ) / product.reviews.length;
        return averageRating >= 4.5;
      })
      .map((product: any) => ({
        id: product.id,
        title: product.title,
        shortSubTitle: product.shortSubTitle,
        longSubTitle: product.longSubTitle,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        discountPercentage: product.discountPercentage,
        brandId: product.brandId,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        reviews: product.reviews,
        largeImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].largeImageUrl
            : null,
        smallImageUrl:
          product.images && product.images.length > 0
            ? product.images[0].smallImageUrl
            : null,
      }));

    if (PopularProducts.length === 0) {
      res.status(404).json({ message: "No Popular products found." });
    } else {
      res.json(PopularProducts);
    }
  } catch (error: any) {

    res.status(500).json({ error: "Database error", details: error.message });
  }
};


// This method handles uploaded images of a specific product by a user
// User can upload up to 5 images
const uploadProductImage= async(req: Request,res: Response): Promise<void> => {
  if(!req.files) {
    throw Error("Please upload an image")
  }

  try {

    const productId = req.params.productId;
    // Get the URLs of the uploaded images
    const urls = Array.isArray(req.files) ? req.files.map(file => {
      return {
        productId,
        url: `${req.protocol}://${req.get('host')}/uploads/productImages/${file.filename}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    }) : [];

    // Save the URLs to the database
    const images = await db.productImages.bulkCreate(urls);
    res.status(201).json({message: "Image was uploaded successfully"})

  }

  catch (error: any) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }


}



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
  filterProductsWithSearch,
  getHandPickedProductsByCategory,
  uploadProductImage,
};

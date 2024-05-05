/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - longSubtitle
 *         - description
 *         - price
 *         - quantity
 *         - discountPercentage
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The title of the product
 *         longSubtitle:
 *           type: string
 *           description: The long subtitle of the product
 *         shortSubtitle:
 *           type: string
 *           description: The short subtitle of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         quantity:
 *           type: integer
 *           description: The quantity of the product
 *         discountPercentage:
 *           type: integer
 *           description: The discount percentage of the product
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the product was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the product was last updated
 */
import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface ProductAttributes {
  id: string;
  title: string;
  longSubtitle: string;
  shortSubtitle: string;
  description: Text;
  price: number;
  quantity: number;
  discountPercentage: number;
  createdAt: bigint;
  updatedAt: bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: string;
    public title!: string;
    public longSubtitle!: string;
    public shortSubtitle!: string;
    public description!: Text;
    public price!: number;
    public quantity!: number;
    public discountPercentage!: number;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Product.hasMany(models.Review, {
        as: "reviews",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductImage, {
        as: "images",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
      Product.belongsTo(models.Category, {
        as: "category",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.Brand, {
        as: "brand",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "brandId",
      });
      Product.belongsTo(models.Cart, {
        as: "cart",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "cartId",
      });
      Product.belongsTo(models.Wishlist, {
        as: "wishlist",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "wishlistId",
      });
      Product.belongsToMany(models.Order, {
        as: "orders",
        through: "productOrders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
    }

    // Define other model setup here, like hooks and scopes
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longSubtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortSubtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: false,
    }
  );

  return Product;
};

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
        as: 'reviews',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductImage, {
        as: 'images',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
      Product.belongsTo(models.Category, {
        as: 'category',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.Brand, {
        as: 'brand',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "brandId",
      });
      Product.belongsTo(models.Cart, {
        as: 'cart',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "cartId",
      });
      Product.belongsTo(models.Wishlist, {
        as: 'wishlist',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "wishlistId",
      });
      Product.belongsToMany(models.Order, {
        as: 'orders',
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
      hooks: {
        beforeCreate: (product: any) => {
          product.createdAt = new Date().getTime();
          product.updatedAt = new Date().getTime();
        },
        beforeUpdate: (product: any) => {
          product.updatedAt = new Date().getTime();
        },
      },
    }
  );

  return Product;
};

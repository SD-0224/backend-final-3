/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       required:
 *         - largeImageUrl
 *         - smallImageUrl
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product image
 *         largeImageUrl:
 *           type: string
 *           description: The URL of the large image
 *         smallImageUrl:
 *           type: string
 *           description: The URL of the small image
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the product image was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the product image was last updated
 */
import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface ProductImageAttributes {
  id: string;
  largeImageUrl: string;
  smallImageUrl: string;
  createdAt: bigint;
  updatedAt: bigint;
}

module.exports = (sequelize: Sequelize) => {
  class ProductImage
    extends Model<ProductImageAttributes>
    implements ProductImageAttributes
  {
    public id!: string;
    public largeImageUrl!: string;
    public smallImageUrl!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      ProductImage.belongsTo(models.Product, {
        as: "product",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
    }

    // Define other model setup here, like hooks and scopes
  }

  ProductImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      largeImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smallImageUrl: {
        type: DataTypes.STRING,
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
      modelName: "ProductImage",
      tableName: "productImages",
      timestamps: false,
    }
  );

  return ProductImage;
};

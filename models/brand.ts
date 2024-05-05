/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the brand
 *         name:
 *           type: string
 *           description: The name of the brand
 *         image:
 *           type: string
 *           description: The image URL of the brand
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the brand was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the brand was last updated
 */
import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface BrandAttributes {
  id: string;
  name: string;
  image: string;
  createdAt: bigint;
  updatedAt: bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Brand extends Model<BrandAttributes> implements BrandAttributes {
    public id!: string;
    public name!: string;
    public image!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Brand.hasMany(models.Product, {
        as: "products",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "brandId",
      });
    }

    // Define other model setup here, like hooks and scopes
  }

  Brand.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
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
      modelName: "Brand",
      tableName: "brands",
      timestamps: false,
    }
  );

  return Brand;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - content
 *         - rating
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         content:
 *           type: string
 *           description: The content of the review
 *         rating:
 *           type: number
 *           description: The rating given in the review
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the review was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the review was last updated
 */

import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface ReviewAttributes {
  id: string;
  content: string;
  rating: number;
  createdAt: bigint;
  updatedAt: bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    public id!: string;
    public content!: string;
    public rating!: number;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Review.belongsTo(models.User, {
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId",
      });
      Review.belongsTo(models.Product, {
        as: "product",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "productId",
      });
    }
  }

  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
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
      modelName: "Review",
      tableName: "reviews",
      timestamps: false,
    }
  );

  return Review;
};

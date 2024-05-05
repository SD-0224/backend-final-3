/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - category
 *         - status
 *         - orderNumber
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         category:
 *           type: string
 *           description: The category of the order
 *         status:
 *           type: string
 *           description: The status of the order
 *         orderNumber:
 *           type: integer
 *           format: int64
 *           description: The order number
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the order was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the order was last updated
 */
import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface OrderAttributes {
  id: string;
  category: string;
  status: string;
  orderNumber: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: string;
    public category!: string;
    public status!: string;
    public orderNumber!: bigint;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Order.belongsTo(models.User, {
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId",
      });
      Order.belongsTo(models.Address, {
        as: "address",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "addressId",
      });
      Order.belongsToMany(models.Product, {
        as: "products",
        through: "productOrders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "orderId",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.BIGINT,
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
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
    }
  );

  return Order;
};

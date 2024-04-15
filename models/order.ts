import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface OrderAttributes {
  id:string;
  category: string;
  status: string;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!:string;
    public category!: string;
    public status!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Order.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Order.belongsTo(models.Address,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'addressId'});
      Order.belongsToMany(models.Product, { through: "productOrders",onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'orderId'});
    }

  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
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
      modelName: "Order",
      tableName: 'orders',
    }
  );

  return Order;
};

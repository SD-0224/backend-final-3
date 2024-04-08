import { DataTypes, Model, Sequelize } from "sequelize";

interface OrderAttributes {
  category: string;
  status: string;
}

module.exports = (sequelize: Sequelize) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    public category!: string;
    public status!: string;

    static associate(models: any) {
      Order.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Order.belongsTo(models.Address,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'addressId'});
      Order.belongsToMany(models.Product, { through: "productOrders",onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'orderId'});
    }

  }

  Order.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
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

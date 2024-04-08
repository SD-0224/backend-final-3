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
      Order.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Order.belongsTo(models.Address,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Order.belongsToMany(models.Product, { through: "ProductOrders",onDelete:'CASCADE', onUpdate: 'CASCADE'});
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
    }
  );

  return Order;
};

import { DataTypes, Model, Sequelize } from "sequelize";

interface CartAttributes {
  itemscount: number;
}

module.exports = (sequelize: Sequelize) => {
  class Cart extends Model<CartAttributes> implements CartAttributes {
    public itemscount!: number;

    static associate(models: any) {
      Cart.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Cart.hasMany(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'cartId'});
    }

    // Define other model setup here, like hooks and scopes
  }

  Cart.init(
    {
      itemscount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: 'carts',
    }
  );

  return Cart;
};

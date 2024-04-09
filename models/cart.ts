import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


interface CartAttributes {
  id:string;
  itemscount: number;
}

module.exports = (sequelize: Sequelize) => {
  class Cart extends Model<CartAttributes> implements CartAttributes {
    public id!:string;
    public itemscount!: number;

    static associate(models: any) {
      Cart.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Cart.hasMany(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'cartId'});
    }

    // Define other model setup here, like hooks and scopes
  }

  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
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

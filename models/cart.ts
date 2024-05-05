/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - itemscount
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the cart
 *         itemscount:
 *           type: integer
 *           description: The number of items in the cart
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the cart was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the cart was last updated
 */
import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


interface CartAttributes {
  id:string;
  itemscount: number;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Cart extends Model<CartAttributes> implements CartAttributes {
    public id!:string;
    public itemscount!: number;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Cart.belongsTo(models.User,{as: 'user',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Cart.hasMany(models.Product,{as: 'products',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'cartId'});
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
      modelName: "Cart",
      tableName: 'carts',
      timestamps: false,
    }
  );

  return Cart;
};

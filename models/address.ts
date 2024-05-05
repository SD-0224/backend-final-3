/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - fullName
 *         - pinCode
 *         - city
 *         - state
 *         - streetAddress
 *         - mobileNumber
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the address
 *         fullName:
 *           type: string
 *           description: The full name associated with the address
 *         pinCode:
 *           type: string
 *           description: The pin code of the address
 *         city:
 *           type: string
 *           description: The city of the address
 *         state:
 *           type: string
 *           description: The state of the address
 *         streetAddress:
 *           type: string
 *           description: The street address
 *         mobileNumber:
 *           type: string
 *           description: The mobile number associated with the address
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the address was created
 *         updatedAt:
 *           type: integer
 *           format: int64
 *           description: The timestamp when the address was last updated
 */

import { DataTypes, Model, Sequelize } from "sequelize";


interface AddressAttributes {
  id:string;
  fullName: string;
  pinCode: string;
  city: string;
  state: string;
  streetAddress: string;
  mobileNumber: string;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Address extends Model<AddressAttributes> implements AddressAttributes {
    public id!:string;
    public fullName!: string;
    public pinCode!: string;
    public city!: string;
    public state!: string;
    public streetAddress!: string;
    public mobileNumber!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Address.belongsTo(models.User,{as: 'user',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Address.hasMany(models.Order,{as: 'orders',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'addressId'});
    }
  }

  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
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
      modelName: "Address",
      tableName: 'addresses',
      timestamps: false,

    }
  );

  return Address;
};
function uuidv4() {
  throw new Error("Function not implemented.");
}


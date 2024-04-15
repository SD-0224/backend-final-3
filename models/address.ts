// address.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";


interface AddressAttributes {
  id:string;
  fullname: string;
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
    public fullname!: string;
    public pinCode!: string;
    public city!: string;
    public state!: string;
    public streetAddress!: string;
    public mobileNumber!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Address.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Address.hasMany(models.Order,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'addressId'});
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
      fullname: {
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

    }
  );

  return Address;
};
function uuidv4() {
  throw new Error("Function not implemented.");
}


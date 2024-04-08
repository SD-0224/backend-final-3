// address.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";

interface AddressAttributes {
  fullname: string;
  pinCode: string;
  city: string;
  state: string;
  streetAdress: string;
  mobileNumber: string;
}

module.exports = (sequelize: Sequelize) => {
  class Address extends Model<AddressAttributes> implements AddressAttributes {
    public fullname!: string;
    public pinCode!: string;
    public city!: string;
    public state!: string;
    public streetAdress!: string;
    public mobileNumber!: string;

    static associate(models: any) {
      Address.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Address.hasMany(models.Order,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
    }
  }

  Address.init(
    {
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
      streetAdress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );

  return Address;
};

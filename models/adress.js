"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Adress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adress.init(
    {
      fullname: DataTypes.STRING,
      pinCode: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      streetAdress: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Adress;
};

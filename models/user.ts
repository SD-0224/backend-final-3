// user.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateofbirth: number;
  password: string;
  avatar: string;
}

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public dateofbirth!: number;
    public password!: string;
    public avatar!: string;

    static associate(models: any) {
      User.hasMany(models.Review);
      User.hasMany(models.Address);
      User.hasMany(models.Order);
      User.hasOne(models.Cart);
      User.hasOne(models.Wishlist);
      User.belongsToMany(models.Payments, { through: 'UserPayments' });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateofbirth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};

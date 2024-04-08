// user.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

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
      User.hasMany(models.Review,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      User.hasMany(models.Address,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      User.hasMany(models.Order,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      User.hasOne(models.Cart,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      User.hasOne(models.Wishlist,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      User.belongsToMany(models.Payments, { through: 'UserPayments',onDelete:'CASCADE', onUpdate: 'CASCADE' });
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
        async set(password: string): Promise<void>  {
          const salt= bcrypt.genSaltSync();
          const hash= bcrypt.hashSync(password,salt)
          this.setDataValue('password', hash)
      }
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

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
      User.hasMany(models.Review,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasMany(models.Address,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasMany(models.Order,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasOne(models.Cart,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasOne(models.Wishlist,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.belongsToMany(models.Payment, { through: 'userPayments',onDelete:'CASCADE', onUpdate: 'CASCADE' ,foreignKey: 'userId'});
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        async set(password: string): Promise<void>  {
          const salt= await bcrypt.genSalt();
          const hash= await bcrypt.hash(password,salt)
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
      tableName: 'users',
    }
  );

  return User;
};

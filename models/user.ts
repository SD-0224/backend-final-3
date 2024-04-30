// user.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

interface UserAttributes {
  id:string;
  firstName: string;
  lastName: string;
  user:string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  password: string;
  avatar: string;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!:string;
    public firstName!: string;
    public lastName!: string;
    public user!: string;
    public email!: string;
    public phone!: string;
    public dateOfBirth!: Date;
    public password!: string;
    public avatar!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      User.hasMany(models.Review,{as: 'reviews',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasMany(models.Address,{as: 'addresses',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasMany(models.Order,{as: 'orders',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasOne(models.Cart,{as: 'cart',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.hasOne(models.Wishlist,{as: 'wishlist',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      User.belongsToMany(models.Payment, {as: 'payments', through: 'userPayments',onDelete:'CASCADE', onUpdate: 'CASCADE' ,foreignKey: 'userId'});
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
          set(value: string) {
          const salt=bcrypt.genSaltSync();
          const hash=bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "User",
      tableName: 'users',
      timestamps: false,

    },


  );



  return User;
};

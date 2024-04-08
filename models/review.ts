// review.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface ReviewAttributes {
  id:string;
  content: string;
  rating: number;
}

module.exports = (sequelize: Sequelize) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    public id!:string;
    public content!: string;
    public rating!: number;

    static associate(models: any) {
      Review.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Review.belongsTo(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId'});
    }
  }

  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: 'reviews',
    }
  );

  return Review;
};

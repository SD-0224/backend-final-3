// review.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";

interface ReviewAttributes {
  content: string;
  rating: number;
}

module.exports = (sequelize: Sequelize) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    public content!: string;
    public rating!: number;

    static associate(models: any) {
      Review.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'userId'});
      Review.belongsTo(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId'});
    }
  }

  Review.init(
    {
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

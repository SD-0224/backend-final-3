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
      Review.belongsTo(models.User,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Review.belongsTo(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
    }
  }

  Review.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};

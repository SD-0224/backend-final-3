import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface CategoryAttributes {
  id:string;
  name: string;
  homeImage: string;
  categoryImage: string;
  title: string;
  subtitle: string;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes> implements CategoryAttributes
  {
    public id!:string;
    public name!: string;
    public homeImage!: string;
    public categoryImage!: string;
    public title!: string;
    public subtitle!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

    static associate(models: any) {
      Category.hasMany(models.Product,{as: 'products',onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'categoryId'});
    }

    // Define other model setup here, like hooks and scopes
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homeImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
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
      modelName: "Category",
      tableName: 'categories',
    }
  );

  return Category;
};

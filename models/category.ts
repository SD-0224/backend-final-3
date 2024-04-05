import { DataTypes, Model, Sequelize } from "sequelize";

interface CategoryAttributes {
  name: string;
  homeImage: string;
  categoryImage: string;
  title: string;
  subtitle: string;
}

module.exports = (sequelize: Sequelize) => {
  class Category
    extends Model<CategoryAttributes>
    implements CategoryAttributes
  {
    public name!: string;
    public homeImage!: string;
    public categoryImage!: string;
    public title!: string;
    public subtitle!: string;

    static associate(models: any) {
      Category.hasMany(models.Product);
    }

    // Define other model setup here, like hooks and scopes
  }

  Category.init(
    {
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
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};

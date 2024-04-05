import { DataTypes, Model, Sequelize } from "sequelize";

interface BrandAttributes {
  name: string;
  image: string;
}

module.exports = (sequelize: Sequelize) => {
  class Brand extends Model<BrandAttributes> implements BrandAttributes {
    public name!: string;
    public image!: string;

    static associate(models: any) {
      Brand.hasMany(models.Product);
    }

    // Define other model setup here, like hooks and scopes
  }

  Brand.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );

  return Brand;
};

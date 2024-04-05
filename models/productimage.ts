import { DataTypes, Model, Sequelize } from "sequelize";

interface ProductImageAttributes {
  url: string;
}

module.exports = (sequelize: Sequelize) => {
  class ProductImage
    extends Model<ProductImageAttributes>
    implements ProductImageAttributes
  {
    public url!: string;

    static associate(models: any) {
      ProductImage.belongsTo(models.Product);
    }

    // Define other model setup here, like hooks and scopes
  }

  ProductImage.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );

  return ProductImage;
};

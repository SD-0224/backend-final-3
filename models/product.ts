import { DataTypes, Model, Sequelize } from "sequelize";

interface ProductAttributes {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  quantity: number;
  discountpercentage: number;
  initialquantity: number;
}

module.exports = (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public title!: string;
    public subtitle!: string;
    public description!: string;
    public price!: number;
    public quantity!: number;
    public discountpercentage!: number;
    public initialquantity!: number;

    static associate(models: any) {
      Product.hasMany(models.Review);
      Product.hasMany(models.ProductImage);
      Product.belongsTo(models.Category);
      Product.belongsTo(models.Brand);
      Product.belongsToMany(models.Order, { through: "ProductOrders" });
    }

    // Define other model setup here, like hooks and scopes
  }

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountpercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      initialquantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};

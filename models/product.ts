import { DataTypes, Model, Sequelize } from "sequelize";

interface ProductAttributes {
  title: string;
  subtitle: string;
  description: Text;
  price: number;
  quantity: number;
  discountpercentage: number;
}

module.exports = (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public title!: string;
    public subtitle!: string;
    public description!: Text;
    public price!: number;
    public quantity!: number;
    public discountpercentage!: number;


    static associate(models: any) {
      Product.hasMany(models.Review,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.hasMany(models.ProductImage,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.belongsTo(models.Category,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.belongsTo(models.Brand,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.belongsTo(models.Cart,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.belongsTo(models.Wishlist,{onDelete:'CASCADE', onUpdate: 'CASCADE'});
      Product.belongsToMany(models.Order, { through: "ProductOrders",onDelete:'CASCADE', onUpdate: 'CASCADE' });
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
        type: DataTypes.TEXT,
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
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};

import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface ProductAttributes {
  id:string;
  title: string;
  subtitle: string;
  description: Text;
  price: number;
  quantity: number;
  discountpercentage: number;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!:string;
    public title!: string;
    public subtitle!: string;
    public description!: Text;
    public price!: number;
    public quantity!: number;
    public discountpercentage!: number;
    public createdAt!: bigint;
    public updatedAt!: bigint;


    static associate(models: any) {
      Product.hasMany(models.Review,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId'});
      Product.hasMany(models.ProductImage,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId'});
      Product.belongsTo(models.Category,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'categoryId'});
      Product.belongsTo(models.Brand,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'brandId'});
      Product.belongsTo(models.Cart,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'cartId'});
      Product.belongsTo(models.Wishlist,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'wishlistId'});
      Product.belongsToMany(models.Order, { through: "productOrders",onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId' });
    }

    // Define other model setup here, like hooks and scopes
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
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
        type: DataTypes.DECIMAL(10, 2),
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
      modelName: "Product",
      tableName: 'products',
    }
  );

  return Product;
};

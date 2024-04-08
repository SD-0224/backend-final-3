import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface ProductImageAttributes {
  id:string;
  url: string;
}

module.exports = (sequelize: Sequelize) => {
  class ProductImage
    extends Model<ProductImageAttributes>
    implements ProductImageAttributes
  {
    public id!:string;
    public url!: string;

    static associate(models: any) {
      ProductImage.belongsTo(models.Product,{onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'productId'});
    }

    // Define other model setup here, like hooks and scopes
  }

  ProductImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: 'productImages',
    }
  );

  return ProductImage;
};

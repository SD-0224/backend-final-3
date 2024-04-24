import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface ProductImageAttributes {
  id:string;
  largeImageUrl: string;
  smallImageUrl: string;
  createdAt:bigint;
  updatedAt:bigint;
}

module.exports = (sequelize: Sequelize) => {
  class ProductImage
    extends Model<ProductImageAttributes>
    implements ProductImageAttributes
  {
    public id!:string;
    public largeImageUrl!: string;
    public smallImageUrl!: string;
    public createdAt!: bigint;
    public updatedAt!: bigint;

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
      largeImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smallImageUrl: {
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
      modelName: "ProductImage",
      tableName: 'productImages',
    }
  );

  return ProductImage;
};

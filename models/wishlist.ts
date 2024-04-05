import { DataTypes, Model, Sequelize } from "sequelize";

interface WishlistAttributes {
  itemscount: number;
}

module.exports = (sequelize: Sequelize) => {
  class Wishlist
    extends Model<WishlistAttributes>
    implements WishlistAttributes
  {
    public itemscount!: number;

    static associate(models: any) {
      Wishlist.belongsTo(models.User);
    }

    // Define other model setup here, like hooks and scopes
  }

  Wishlist.init(
    {
      itemscount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );

  return Wishlist;
};

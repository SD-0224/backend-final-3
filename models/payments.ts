import { DataTypes, Model, Sequelize } from "sequelize";

interface PaymentsAttributes {
  type: string;
}

module.exports = (sequelize: Sequelize) => {
  class Payments
    extends Model<PaymentsAttributes>
    implements PaymentsAttributes
  {
    public type!: string;

    static associate(models: any) {
      Payments.belongsToMany(models.User, { through: "UserPayments" });
    }

    // Define other model setup here, like hooks and scopes
  }

  Payments.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Payments",
    }
  );

  return Payments;
};

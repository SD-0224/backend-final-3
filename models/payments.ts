import { DataTypes, Model, Sequelize } from "sequelize";

interface PaymentsAttributes {
  type: string;
}

module.exports = (sequelize: Sequelize) => {
  class Payment
    extends Model<PaymentsAttributes>
    implements PaymentsAttributes
  {
    public type!: string;

    static associate(models: any) {
      Payment.belongsToMany(models.User, { through: "userPayments",onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'paymentId' });
    }

    // Define other model setup here, like hooks and scopes
  }

  Payment.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: 'payments',
    }
  );

  return Payment;
};

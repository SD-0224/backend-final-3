import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface PaymentsAttributes {
  id:string;
  type: string;
}

module.exports = (sequelize: Sequelize) => {
  class Payment
    extends Model<PaymentsAttributes>
    implements PaymentsAttributes
  {
    public id!:string;
    public type!: string;

    static associate(models: any) {
      Payment.belongsToMany(models.User, { through: "userPayments",onDelete:'CASCADE', onUpdate: 'CASCADE',foreignKey: 'paymentId' });
    }

    // Define other model setup here, like hooks and scopes
  }

  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:() => uuidv4(),
        allowNull: false,
        primaryKey:true
      },
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

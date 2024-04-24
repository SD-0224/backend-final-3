'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn(
          'productOrders',
          'createdAt',
          {type: Sequelize.DataTypes.BIGINT,
          allowNull:false},
          { transaction: t },
        ),
        queryInterface.changeColumn(
          'productOrders',
          'updatedAt',
          {type: Sequelize.DataTypes.BIGINT,
          allowNull:false},
          { transaction: t },
        )
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('productOrders', 'createdAt', {type: Sequelize.DataTypes.DATE,
          allowNull:false},
          {transaction: t,}),
          queryInterface.changeColumn('productOrders', 'updatedAt', {type: Sequelize.DataTypes.DATE,
            allowNull:false},
            {transaction: t,})
      ]);
    });
  }
};

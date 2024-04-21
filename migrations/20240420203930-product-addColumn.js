'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'products',
          'shortSubtitle',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull:true,
          },
          { transaction: t },
        ),
        queryInterface.renameColumn(
          'products',
          'subtitle',
          'longSubtitle',
          { transaction: t },
        ),
        queryInterface.changeColumn(
          'products',
          'price',
          {type: Sequelize.DataTypes.FLOAT,
          allowNull:false},
          { transaction: t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('products', 'shortSubtitle', { transaction: t }),
        queryInterface.renameColumn('products', 'longSubtitle', 'subtitle',{transaction: t,}),
        queryInterface.changeColumn('products', 'price', {type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull:false},
          {transaction: t,}),
      ]);
    });
  }
};

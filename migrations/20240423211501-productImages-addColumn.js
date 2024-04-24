'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'productImages',
          'width',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull:true,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'productImages',
          'height',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull:true,
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('productImages', 'width', { transaction: t }),
        queryInterface.removeColumn('productImages', 'height', { transaction: t })
      ]);
    });
  }
};

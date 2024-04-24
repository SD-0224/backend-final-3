'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'productImages',
          'largeImageUrl',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull:false,
          },
          { transaction: t },
        ),
        queryInterface.renameColumn(
          'productImages',
          'url',
          'smallImageUrl',
          { transaction: t },
        ),
        queryInterface.removeColumn(
          'productImages',
          'width',
          { transaction: t },
        ),
        queryInterface.removeColumn(
          'productImages',
          'height',
          { transaction: t },
        )
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('productImages', 'largeImageUrl', { transaction: t }),
        queryInterface.renameColumn('productImages', 'smallImageUrl', 'url',{transaction: t,}),
        queryInterface.addColumn('productImages', 'width',{transaction: t,}),
        queryInterface.addColumn('productImages', 'height',{transaction: t,}),
      ]);
    });
  }
};

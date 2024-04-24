'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        
        queryInterface.renameColumn(
          'products',
          'discountpercentage',
          'discountPercentage',
          { transaction: t },
        )
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('products', 'discountPercentage', 'discountpercentage',{transaction: t,}),
        
      ]);
    });
  }
};

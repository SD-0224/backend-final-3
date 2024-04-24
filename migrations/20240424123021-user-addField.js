'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'user',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull:false,
            unique:true
          },
          { transaction: t },
        ),
        queryInterface.renameColumn(
          'users',
          'dateofbirth',
          'dateOfBirth',
          { transaction: t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'user', { transaction: t }),
        queryInterface.renameColumn('users', 'dateOfBirth', 'dateofbirth',{transaction: t,}),
      ]);
    });
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'user',
          {
            type: Sequelize.DataTypes.STRING,
            allowNull:false,
            unique:true
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('users',
        'user',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull:false,
          unique:false
        },
        { transaction: t },),
        
      ]);
    });
  }
};

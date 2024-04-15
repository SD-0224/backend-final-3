'use strict';

const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414160213-demo-productOrder.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('productOrders', [
      {
        
        orderId: '73012fe3-fec0-4260-9da9-82e4f63d8f16',
        productId:'e0369fef-c43e-4ca2-aca3-d4765dc416c8',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';

const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414151959-demo-order.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orders', [
      {
        id:uuidv4(),
        category: 'processing',
        status: 'unpaid',
        addressId: '4ac84632-5a7d-44e9-b1d3-ece706040f1b',
        userId:'a3fd1ced-3107-4fc7-b3cf-50373321dd7a',
        createdAt: today,
        updatedAt: today
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

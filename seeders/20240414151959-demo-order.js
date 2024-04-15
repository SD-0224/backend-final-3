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
        addressId: 'c747c9b5-6649-4b81-81fb-57174dc1aa22',
        userId:'e3b365bc-9575-4d8d-b7ac-f96d869ca882',
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

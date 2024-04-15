'use strict';
const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414124343-demo-product.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
    {
      id:"e0369fef-c43e-4ca2-aca3-d4765dc416c8",
      title: 'Unbranded Cotton Fish',
      subtitle: 'Adipisci numquam tempore iste explicabo tempora voluptatem nulla soluta.',
      description: 'Aliquid aut voluptatibus et dolorem perferendis optio unde atque. Iure quis minima consequatur sit labore. Eum debitis est.',
      price:251.00,
      quantity:80,
      discountpercentage:42,
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

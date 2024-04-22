'use strict';

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414151959-demo-order.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/user.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const users=data.users;
    const allOrders = [];

    users.forEach(user => {
      const orders = Object.entries(user.orders).map(([id, order]) => ({
      id,
      userId:user.id,
      createdAt:order.date,
      updatedAt:today,
      category:order.category,
      status:order.status,
      }));
        
        
      allOrders.push(...orders);
      });
    await queryInterface.bulkInsert('orders', allOrders, {});  
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

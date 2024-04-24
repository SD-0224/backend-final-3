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
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const orders=data.orders;

    orders.map((order)=> {
      order.updatedAt= today;
    })
    await queryInterface.bulkInsert('orders', orders, {});  
  },

  async down (queryInterface, Sequelize) {
    
    
    await queryInterface.bulkDelete('orders', null, {});
    
  }
};

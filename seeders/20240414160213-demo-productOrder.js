'use strict';
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414160213-demo-productOrder.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const orders=data.orders;
    const products=data.products
    let AllproductOrders=[];
    let orderIndex=90
    while(orderIndex<100) {
      let count=1800;
      let index=1797;
      while(count-index!=0) {
        let productOrder={
          orderId:orders[orderIndex].id,
          productId:products[index].id,
          createdAt:orders[orderIndex].createdAt,
          updatedAt:today
        }
        AllproductOrders.push(productOrder)
        index++;
      }
      count+=index;
      orderIndex++;
      
    }
    await queryInterface.bulkInsert('productOrders', AllproductOrders, {});  
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

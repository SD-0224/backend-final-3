"use strict";
const { v4: uuidv4 } = require("uuid");
const today = new Date().getTime();
const fs = require('fs');
const path = require('path');

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414124343-demo-product.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const products=data.products;
    products.map((product)=> {
      product.updatedAt= today;
    })
    await queryInterface.bulkInsert('products', products, {});  
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

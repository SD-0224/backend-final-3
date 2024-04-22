"use strict";

const fs = require('fs');
const path = require('path');
//**How to seed one file only */
//npx sequelize db:seed --seed 20240415171407-demo-brand.js
const today = new Date().getTime();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/brand.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const brands=data.brands;
    brands.map((brand)=> {
      
      brand.createdAt= today;
      brand.updatedAt= today;
    })
    await queryInterface.bulkInsert('brands', brands, {});  
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('brands', null, {});
  },
};

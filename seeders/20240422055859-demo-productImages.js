'use strict';
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const today = new Date().getTime();

//**How to seed one file only */
//npx sequelize db:seed --seed 20240422055859-demo-productImages.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const productImages=data.productImages;
    productImages.map((image)=> {
        image.createdAt=today
        image.updatedAt=today
    })  
    await queryInterface.bulkInsert('productImages', productImages, {}); 
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('productImages', null, {});
    
  }
};

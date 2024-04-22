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
    const filePath = path.join(__dirname, '../fakeData/product.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const products=data.products;
    const productImages=[];
    products.map((product)=> {
        const image= { }
        image.id=uuidv4()
        image.productId=product.id,
        image.url=product.url,
        image.createdAt=product.createdAt,
        image.updatedAt=today
        productImages.push(image)
    
    })  
    await queryInterface.bulkInsert('productImages', productImages, {}); 
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('productImages', null, {});
    
  }
};

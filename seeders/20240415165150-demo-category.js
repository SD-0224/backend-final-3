"use strict";
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');


//npx sequelize db:seed --seed 20240415165150-demo-category.js

const today = new Date().getTime();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/category.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const categories=data.categories;
    categories.map((category)=> {
      delete category.brands
      category.createdAt= today;
      category.updatedAt= today;
    })
    await queryInterface.bulkInsert('categories', categories, {}); 
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categories', null, {});
     
  },
};

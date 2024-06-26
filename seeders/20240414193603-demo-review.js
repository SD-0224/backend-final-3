'use strict';
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414193603-demo-review.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const reviews=data.reviews;

    await queryInterface.bulkInsert('reviews', reviews, {});  
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('reviews', null, {});
     
  }
};

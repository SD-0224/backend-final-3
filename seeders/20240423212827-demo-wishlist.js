"use strict";

const fs = require('fs');
const path = require('path');
//**How to seed one file only */
//npx sequelize db:seed --seed 20240423212827-demo-wishlist.js
const today = new Date().getTime();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const wishlists=data.wishlists;
    
    await queryInterface.bulkInsert('wishlists', wishlists, {});  
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('wishlists', null, {});
  },
};
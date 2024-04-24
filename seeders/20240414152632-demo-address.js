'use strict';

const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();
const fs = require('fs');
const path = require('path');

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414152632-demo-address.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const addresses=data.addresses;
    addresses.map((address)=> {
        address.createdAt= today;
        address.updatedAt= today;
    })
    await queryInterface.bulkInsert('addresses', addresses, {});  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('addresses', null, {});
     
  }
};

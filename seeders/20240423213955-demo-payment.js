"use strict";

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
//**How to seed one file only */
//npx sequelize db:seed --seed 20240423213955-demo-payment.js
const today = new Date().getTime();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const payments=[{
      id:uuidv4(),
      type:"PayPal",
      createdAt:today,
      updatedAt:today
    },
    {
      id:uuidv4(),
      type:"Cash",
      createdAt:today,
      updatedAt:today
    },
    {
      id:uuidv4(),
      type:"Credit Card",
      createdAt:today,
      updatedAt:today
    },
    {
      id:uuidv4(),
      type:"Apple Pay",
      createdAt:today,
      updatedAt:today
    }
  ]
    
    await queryInterface.bulkInsert('payments', payments, {});  
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('payments', null, {});
  },
};
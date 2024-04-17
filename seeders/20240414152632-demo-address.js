'use strict';

const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414152632-demo-address.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('addresses', [
      {
        id:uuidv4(),
        fullname: 'John Doe',
        pinCode: '38076-3794',
        city: 'Port Cooper',
        state:'Minnesota',
        streetAddress:'Abbott Stravenue',
        mobileNumber:'+409876332244',
        userId:"a3fd1ced-3107-4fc7-b3cf-50373321dd7a",
        createdAt: today,
        updatedAt: today
      }
    
      ])
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

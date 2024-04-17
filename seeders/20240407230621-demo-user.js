'use strict';
const bcrypt =require('bcrypt');
const { timeStamp } = require('console');
const { v4: uuidv4 } = require('uuid');

//**How to seed one file only */
//npx sequelize db:seed --seed 20240407230621-demo-user.js

const hashedPassword=bcrypt.hashSync(process.env.seedPassword,10);
const today = new Date().getTime();
console.log(today)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id:"c36c7fe7-e2db-43b6-993f-a3c0b5846b1b",
      firstName: 'Nicklaus',
      lastName: 'Kertzmann',
      email: 'Vergie.Macejkovic@yahoo.com',
      phone:"1-489-687-6594",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://loremflickr.com/320/240/person?random=147',
      createdAt: today,
      updatedAt: today
    },
    ]);
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

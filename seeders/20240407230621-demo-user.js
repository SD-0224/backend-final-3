'use strict';
const bcrypt =require('bcrypt');
const { timeStamp } = require('console');
const { v4: uuidv4 } = require('uuid');

const hashedPassword=bcrypt.hashSync(process.env.seedPassword,10);
const today = new Date().getTime();
console.log(today)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id:uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone:"+409876332244",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    },
    {
      id:uuidv4(),
      firstName: 'Amer',
      lastName: 'Hallaq',
      email: 'amer@example.com',
      phone:"+97055687354",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    },
    {
      id:uuidv4(),
      firstName: 'Ahmad',
      lastName: 'Shaker',
      email: 'ahmad@example.com',
      phone:"+97057687354",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    },
    {
      id:uuidv4(),
      firstName: 'Mahmoud',
      lastName: 'Abu Salem',
      email: 'mahmoud@example.com',
      phone:"+97051687354",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    },
    {
      id:uuidv4(),
      firstName: 'Rana',
      lastName: 'Saleem',
      email: 'rana@example.com',
      phone:"+97251687354",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    },
    {
      id:uuidv4(),
      firstName: 'Mike',
      lastName: 'Saleem',
      email: 'mike@example.com',
      phone:"+97151687354",
      dateofbirth:new Date(),
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: today,
      updatedAt: today
    }

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

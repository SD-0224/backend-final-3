'use strict';
const bcrypt =require('bcrypt');

const hashedPassword=bcrypt.hashSync(process.env.seedPassword,10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone:"+409876332244",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Amer',
      lastName: 'Hallaq',
      email: 'amer@example.com',
      phone:"+97055687354",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Ahmad',
      lastName: 'Shaker',
      email: 'ahmad@example.com',
      phone:"+97057687354",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Mahmoud',
      lastName: 'Abu Salem',
      email: 'mahmoud@example.com',
      phone:"+97051687354",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Rana',
      lastName: 'Saleem',
      email: 'rana@example.com',
      phone:"+97251687354",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Mike',
      lastName: 'Saleem',
      email: 'mike@example.com',
      phone:"+40051687354",
      dateofbirth:12345667,
      password:hashedPassword,
      avatar:'https://urlimage/user',
      createdAt: new Date(),
      updatedAt: new Date()
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

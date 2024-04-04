'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      age: "23",
      password:"asfgkjsd",
      mobile:"368348972",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'amer',
      lastName: 'Doe',
      email: 'example@example.com',
      age: "23",
      password:"asfgkjsd",
      mobile:"368348972",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'mahmoud',
      lastName: 'Doe',
      email: 'example@example.com',
      age: "23",
      password:"asfgkjsd",
      mobile:"368348972",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      phone: {
        unique: true,
        type: Sequelize.STRING,
      },
      dateofbirth: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      pinCode: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      streetAddress: {
        type: Sequelize.STRING,
      },
      mobileNumber: {
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
    await queryInterface.dropTable("addresses");
  },
};

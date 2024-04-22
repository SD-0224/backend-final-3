"use strict";

const { v4: uuidv4 } = require("uuid");

const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414193603-demo-review.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("reviews", [
      {
        id: uuidv4(),
        content: "Voluptatibus porro eveniet qui molestiae.",
        rating: "2",
        productId: "e0369fef-c43e-4ca2-aca3-d4765dc416c8",
        userId: "498a98c2-ea45-4de2-bebd-c5c9fade59af",
        createdAt: today,
        updatedAt: today,
      },
      {
        id: uuidv4(),
        content:
          "Deleniti ea delectus. Accusamus ad sit qui facilis quidem. Eum blanditiis et.",
        rating: "4",
        productId: "ee95587d-f688-4ea7-9808-7dd9de6d1145",
        userId: "498a98c2-ea45-4de2-bebd-c5c9fade59af",
        createdAt: today,
        updatedAt: today,
      },
      {
        id: uuidv4(),
        content:
          "Deleniti ea delectus. Accusamus ad sit qui facilis quidem. Eum blanditiis et.",
        rating: "5",
        productId: "a4517436-34fb-4741-9e52-cd59dfbd2af8",
        userId: "498a98c2-ea45-4de2-bebd-c5c9fade59af",
        createdAt: today,
        updatedAt: today,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

"use strict";
const { v4: uuidv4 } = require('uuid');
const today = new Date().getTime();

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414124343-demo-product.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      /*  {
        id: "e0369fef-c43e-4ca2-aca3-d4765dc416c3",
        title: "Unbranded Cotton Fishh",
        subtitle:
          "Adipisci numquam tempore iste explicabo tempora voluptatem nulla soluta.",
        description:
          "Aliquid aut voluptatibus et dolorem perferendis optio unde atque. Iure quis minima consequatur sit labore. Eum debitis est.",
        price: 300.15,
        quantity: 80,
        discountpercentage: 42,
        createdAt: today,
        updatedAt: today,
      },
      {
        id: "36174128-b266-45e6-999b-52e519d4cee4",
        title: "Awesome Granite Shirt",
        subtitle: "Iusto distinctio iusto consequatur.",
        description:
          "Officiis blanditiis illo et fugiat ut ullam quasi. Iste ut dolores in deserunt. Ea adipisci sunt sapiente ex quia qui sapiente sit qui.",
        price: 100.99,
        quantity: 35,
        categoryId: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        brandId: "1ef74724-c8fb-4259-b446-5c1fcb7b89c8",
        discountpercentage: 20,
        createdAt: today,
        updatedAt: today,

      },
      {
        id: "298e8bf9-1da1-4377-83d0-1faf4c33e6a7",
        title: "Licensed Soft Bike",
        subtitle: "Error officiis explicabo.",
        description:
          "Officiis blanditiis illo et fugiat ut ullam quasi. Iste ut dolores in deserunt. Ea adipisci sunt sapiente ex quia qui sapiente sit qui.",
        price: 168,
        quantity: 39,
        categoryId: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        brandId: "b7a1a08f-448e-42d5-9adf-e1deb4cb2b53",
        discountpercentage: 36,
        createdAt: today,
        updatedAt: today,
      },
      {
        id: "298e8bf9-1da1-4377-83d0-1faf4c33e6a7",
        title: "Licensed Soft Bike",
        subtitle: "Error officiis explicabo.",
        description:
          "Officiis blanditiis illo et fugiat ut ullam quasi. Iste ut dolores in deserunt. Ea adipisci sunt sapiente ex quia qui sapiente sit qui.",
        price: 168,
        quantity: 39,
        categoryId: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        brandId: "b7a1a08f-448e-42d5-9adf-e1deb4cb2b53",
        discountpercentage: 36,
        createdAt: today,
        updatedAt: today,
      },
      {
        id: "298e8bf9-1da1-4377-83d0-1faf4c33e6a7",
        title: "Licensed Soft Bike",
        subtitle: "Error officiis explicabo.",
        description:
          "Officiis blanditiis illo et fugiat ut ullam quasi. Iste ut dolores in deserunt. Ea adipisci sunt sapiente ex quia qui sapiente sit qui.",
        price: 168,
        quantity: 39,
        categoryId: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        brandId: "b7a1a08f-448e-42d5-9adf-e1deb4cb2b53",
        discountpercentage: 36,
        createdAt: today,
        updatedAt: today,
      },*/
      {
        id: "298e8bf9-1da1-4377-83d0-1faf4c33e6a7q",
        title: "Licensed Soft Bikeeee",
        subtitle: "Error officiis explicabooo.",
        description:
          "Officiis blanditiis illo et fugiat ut ullam quasi. Iste ut dolores in deserunt. Ea adipisci sunt sapiente ex quia qui sapiente sit qui.",
        price: 168,
        quantity: 40,
        categoryId: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        brandId: "c6056d97-f5cd-4f5b-abd6-3ca455befcf5",
        discountpercentage: 36,
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

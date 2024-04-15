"use strict";

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
      },*/
      {
        id: "a4517436-34fb-4741-9e52-cd59dfbd2af8",
        title: "Ergonomic Cotton Pizzaa",
        subtitle: "Iusto distinctio iusto consequatur.",
        description:
          "Iusto perspiciatis provident tenetur consectetur voluptas nihil non hic sit. Dignissimos ex est fuga. Eos aliquid vel quisquam voluptatem voluptas placeat et fugit. Aut animi non officia. Doloremque voluptas aut unde esse.",
        price: 34,
        quantity: 8,
        categoryId: "5e68da67-fc6a-48b6-bb14-83ec887159ac",
        brandId: "a9603dfd-1c0e-4b5c-a952-2ad71bafb14a",
        discountpercentage: 1,
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

"use strict";

const today = new Date().getTime();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        id: "7e02ce34-52fe-4fdf-8ec7-16f8baa40abc",
        name: "Handbags",
        homeImage: "https://source.unsplash.com/400x400/?handbags",
        categoryImage: "https://source.unsplash.com/400x400/?handbags",
        title: "Sequi ipsum voluptas in doloremque qui nam qui tenetur.",
        subtitle:
          "Molestias recusandae ipsa suscipit non et ex dolores non ut. Voluptatem nihil aut quia sint consequatur illo accusantium. Et eius et aut iusto cupiditate.",
        createdAt: today,
        updatedAt: today,
      },
      {
        id: "5e68da67-fc6a-48b6-bb14-83ec887159ac",
        name: "watches",
        homeImage: "https://source.unsplash.com/400x400/?watches",
        categoryImage: "https://source.unsplash.com/400x400/?watches",
        title: "Sit et eum.",
        subtitle:
          "Ut fugiat assumenda consequatur impedit ea. Consequatur consequatur asperiores reiciendis nihil et odio possimus sapiente optio. Nihil provident saepe quia ea nesciunt. Quasi ut pariatur doloribus voluptas illo atque veritatis. In debitis omnis.",

        createdAt: today,
        updatedAt: today,
      },
      {
        id: "574e32f5-e815-4ec6-9d7b-8dddf011fb8e",
        name: "skincare",
        homeImage: "https://source.unsplash.com/400x400/?skincare",
        categoryImage: "https://source.unsplash.com/400x400/?skincare",
        title: "Porro quia aut sint culpa laborum laboriosam eligendi numquam.",
        subtitle:
          "Molestiae et dolore tempore. Molestias blanditiis quibusdam est minus. Provident eum deserunt qui suscipit ut. Sit est blanditiis nobis iure et commodi. Possimus vel rerum id magni laboriosam reprehenderit aut.",

        createdAt: today,
        updatedAt: today,
      },
      {
        id: "77bb322c-2059-4a87-a52b-30a8c2109604",
        name: "jewellery",
        homeImage: "https://source.unsplash.com/400x400/?jewellery",
        categoryImage: "https://source.unsplash.com/400x400/?jewellery",
        title: "Eos est a est totam ducimus debitis eum ad velit.",
        subtitle:
          "Molestiae ut aliquid corrupti non cum. Officia fugit ut omnis sed id id est. Vel et dolores atque sit itaque et est deserunt fuga. Cumque illo maxime officia soluta ratione.",
        createdAt: today,
        updatedAt: today,
      },
      {
        id: "73399d6d-1a62-4aa3-9165-e77abe2161d5",
        name: "apparels",
        homeImage: "https://source.unsplash.com/400x400/?apparels",
        categoryImage: "https://source.unsplash.com/400x400/?apparels",
        title: "Alias at fuga ut veritatis ea perspiciatis voluptates.",
        subtitle:
          "Possimus qui earum. Suscipit et rerum modi eos ad rerum. Nemo rem sequi quas. Ea et autem voluptatem sequi.",
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

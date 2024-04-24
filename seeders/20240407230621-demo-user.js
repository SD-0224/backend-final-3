'use strict';
const bcrypt =require('bcrypt');
const { timeStamp } = require('console');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

//**How to seed one file only */
//npx sequelize db:seed --seed 20240407230621-demo-user.js

const hashPassword= (password)=> {

  return  bcrypt.hashSync(password,10);
}

const today = new Date().getTime();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/database.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const users=data.users;
    users.map((user)=> {
      user.password=hashPassword(user.password)
      user.createdAt= today;
      user.updatedAt= today;
    })
    await queryInterface.bulkInsert('users', users, {});  
}, 
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {}); 
  }
};

    





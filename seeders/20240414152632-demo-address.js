'use strict';

const { v4: uuidv4 } = require('uuid');

const today = new Date().getTime();
const fs = require('fs');
const path = require('path');

//**How to seed this file only */
//npx sequelize db:seed --seed 20240414152632-demo-address.js

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../fakeData/user.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const users=data.users;
    let addresses=[]
    users.map((user)=> {
        const addressKey=Object.keys(user.address)
        const addressVal=user.address[addressKey];
        let address=new Map()
        address={id:addressKey[0],...addressVal}
        delete address.country
        address.userId=user.id
        address.fullname=user.firstName+" "+user.lastName
        address.mobileNumber=user.phone
        address.createdAt= today;
        address.updatedAt= today;
        addresses.push(address)
    })
    await queryInterface.bulkInsert('addresses', addresses, {});  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('addresses', null, {});
     
  }
};

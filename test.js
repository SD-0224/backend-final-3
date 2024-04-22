const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, './fakeData/user.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const users=data.users;
const allOrders = [];

    users.forEach(user => {
      const orders = Object.entries(user.orders).map(([id, order]) => ({
      id,
      userId:user.id,
      createdAt:order.date,
      category:order.category,
      status:order.status,
      addressId:Object.keys(order.address)[0]
      }));
      
      
      allOrders.push(...orders);
    });

    console.log(allOrders[1])
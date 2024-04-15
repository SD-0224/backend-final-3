'use strict';
// tslint:disable-next-line
const fs = require('fs');
// tslint:disable-next-line
const path = require('path');
// tslint:disable-next-line
const Sequelize = require('sequelize');
// tslint:disable-next-line
const process = require('process');
// tslint:disable-next-line
const basename = path.basename(__filename);
// tslint:disable-next-line
const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line
const config = require(__dirname + '/../config/dbconfig.js')[env];
// tslint:disable-next-line
const db:any = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.js') === -1
    );
  })
  // tslint:disable-next-line
  .forEach((file: any) => {
    // tslint:disable-next-line
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

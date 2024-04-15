import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

// Importing the database configuration from a TypeScript file
import config from '../config/dbconfig';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db: Record<string, any> = {};

const sequelizeConfig = config[env];
let sequelize: Sequelize;
if (sequelizeConfig.use_env_variable) {
  const databaseUrl = process.env[sequelizeConfig.use_env_variable];
  if (!databaseUrl) {
    throw new Error(`Environment variable ${sequelizeConfig.use_env_variable} is not set`);
  }
  sequelize = new Sequelize(databaseUrl, sequelizeConfig);
} else {
  sequelize = new Sequelize(sequelizeConfig.database || '', sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig);
}
fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Assuming your models are TypeScript files
      file.indexOf('.test.ts') === -1 // Exclude test files
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
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
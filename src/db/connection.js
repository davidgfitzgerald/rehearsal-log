const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')

const mode = "test"
let database;

switch (mode) {
  default: database = config.development; break;
  case "test": database = config.test; break;
  case "production": database = config.production; break;

}

const sequelize = new Sequelize({
  dialect: database.dialect,
  username: database.username,
  host: database.host,
  logging: (...msg) => console.log(msg) // Remove to show fewer
})

module.exports = sequelize;
global.sequelize = sequelize;
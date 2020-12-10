const { Sequelize } = require('sequelize');

const config = require('../../config/config.json')
const environment = process.env.NODE_ENV || "development"
const envConfig = config[environment]

const sequelize = new Sequelize({
  dialect: envConfig.dialect,
  username: envConfig.username,
  host: envConfig.host,
  // logging: (...msg) => console.log(msg) // Remove to show fewer
})

module.exports = { sequelize, envConfig }
global.sequelize = sequelize;
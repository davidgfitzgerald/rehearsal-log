const { Sequelize } = require('sequelize');

const config = require('../../config.bkup/config.json')
const environment = process.env.NODE_ENV || "development"
const envConfig = config[environment]

const sequelize = new Sequelize({
  dialect: envConfig.dialect,
  username: envConfig.username,
  host: envConfig.host,
  database: envConfig.database,
  logging: false //(...msg) => console.log(msg) // To show more
})

module.exports = { sequelize, envConfig }
// global.sequelize = sequelize;
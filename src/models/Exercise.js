const Sequelize = require("sequelize")
const { sequelize } = require("../db/connection")

module.exports = sequelize.define("Exercise", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    // unique: true TODO design choice
  },
  instrument: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
})
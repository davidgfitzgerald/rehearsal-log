const Sequelize = require("sequelize")
const { sequelize } = require("../db/connection")

module.exports = sequelize.define("Practice", {

  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  bpm: Sequelize.INTEGER,

  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },

  exercise_id: {
    type: Sequelize.INTEGER,
    foreignKey: true
  }
})
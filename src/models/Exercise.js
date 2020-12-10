import {Model} from "sequelize";

const Sequelize = require("sequelize")
const { sequelize } = require("../db/connection")

class Exercise extends Model { }

Exercise.init({
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
}, { sequelize});

export { Exercise }
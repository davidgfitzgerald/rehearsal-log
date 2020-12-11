import {Model} from "sequelize";

const Sequelize = require("sequelize")
const { sequelize } = require("../db/connection")

class Exercise extends Model {
  static shape = {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      // unique: true //TODO unique per instrument. For example, RL could be a drum exercise or a piano exercise.
    },
    instrument: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }
}

Exercise.init(Exercise.shape, { sequelize});

export { Exercise }
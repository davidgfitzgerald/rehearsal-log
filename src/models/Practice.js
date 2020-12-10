// const Sequelize = require('sequelize'); // Individual imports
// const DataTypes = require("sequelize"); // can fix intellisense bug.

import { Model, DataTypes } from "sequelize";
import { Exercise } from "./Exercise";

const { sequelize } = require("../db/connection")
class Practice extends Model { }

Practice.init({
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  duration: {
    type: DataTypes.INTEGER(5),
    allowNull: false
  },
  bpm: {
    type: DataTypes.INTEGER(3),
    validate: {
      min: 0,
      max: 999
    }
  },
  rating: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: Exercise
    }
  }
}, { sequelize});

export {Practice}
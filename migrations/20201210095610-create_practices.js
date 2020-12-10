'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("practices", {
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
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('practices');

  }
};

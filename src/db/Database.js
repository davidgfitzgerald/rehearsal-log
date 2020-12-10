import { QueryTypes } from "sequelize";
const { sequelize, envConfig } = require('../db/connection')

class Database {
  constructor() {
    this.name = envConfig.database
  }

  async canConnect() {
    try {
      await sequelize.authenticate({logging: false});
      return true
    } catch (err) {
      console.error("Unable to connect to the database")
      return false
    }
  }

  async showDatabases() {
    return await sequelize.query("SHOW DATABASES;", { type: QueryTypes.SELECT })
  }

  async tables() {
    return await sequelize.query("SHOW TABLES;", {type: QueryTypes.SHOWTABLES })
  }

  async close() {
    await sequelize.close()
  }
}

export { Database }

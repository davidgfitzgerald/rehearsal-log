const { Sequelize } = require("sequelize");
const { sequelize, envConfig } = require('../db/connection')

let dbName = envConfig.database;

async function resetDB() {
  await sequelize.query(`DROP DATABASE IF EXISTS ${dbName}`)
  await sequelize.query(`CREATE DATABASE ${dbName}`)
  await sequelize.query(`USE ${dbName};`);
}

async function main() {
  try {
    // await sequelize.authenticate();
    await resetDB();

    await sequelize.close()
    console.log("Connection closed")
  } catch (err) {
    console.error("Unable to connect to database: ", err)
  }
}

main().then(res => {
    console.log("main finished")
  }
)


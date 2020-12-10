const { Sequelize } = require("sequelize");
const { sequelize, envConfig } = require('../db/connection')

async function resetDB(dbName) {
  await sequelize.query(`DROP DATABASE IF EXISTS ${dbName};`)
  await sequelize.query(`CREATE DATABASE ${dbName};`)
  await sequelize.query(`USE ${dbName};`);
}

async function showDatabases() {
  return await sequelize.query("SHOW DATABASES;", { type: Sequelize.QueryTypes.SELECT })
}

async function main() {
  console.log("createDatabase.js main() called")
  try {
    await sequelize.authenticate();
    await resetDB(envConfig.database);

    await sequelize.close()
    console.log("Connection closed")
  } catch (err) {
    console.error("Unable to connect to database: ", err)
  }
}

// main().then(res => {
//     console.log("createDatabase.js main() finished")
//   }
// )

export { resetDB, showDatabases, main }

const sequelize = require('../db/connection')

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection established")



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

console.log("main is async so this is called before it finishes")
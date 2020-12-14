console.log("testEnvironment.js ran")

const NodeEnvironment = require('jest-environment-node')

if (!global.baby) {
  global.baby = "GOT IT!"
}

class Environment extends NodeEnvironment {
  async setup() {
    if (!global.baby) {
      global.baby = "GOT IT!"
    }
  }
}

module.exports = Environment
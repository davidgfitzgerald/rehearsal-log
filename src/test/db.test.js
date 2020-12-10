import { db } from '../db/testDatabase'

beforeAll(()=>{

})

describe('connect to localhost:3306', () => {
  test("connect to localhost", () => {
    expect(db.config.port).toBe(3306)
  })

  test("port 3306", () => {
    expect(db.config.host).toBe('localhost')
  })
});

describe("reset DB", () => {
  test("See if database exists")
})
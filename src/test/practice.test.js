import {Database} from "../db/Database";
import {Practice, Exercise} from "../models";

let db;

beforeAll(async () => {
  db = new Database();
})

beforeEach(async () => {
  await Exercise.sync()
  await Practice.sync()
})

afterAll(() => {
})

test("practices table exists", async () => {
  const tables = await db.tables()
  await expect(tables).toContain("practices")
})

test("can create practice", async() => {

})

test.todo("two sequentially generated practices have consecutive ids")

test.todo("only authenticated users can create practice in DB")
test.todo("public practices can be retrieved by anyone")
test.todo("private practices can only be retrieved by the user")
test.todo("practices can be graphed")
test.todo("user can practice an exercise")
test.todo("user can practice a song")
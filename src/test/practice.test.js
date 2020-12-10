import {Practice} from "../models/Practice";
import {Database} from "../db/Database";

let db;

beforeAll(async () => {
  db = new Database();
})

beforeEach(async () => {
  await Practice.sync({force: true})
})

afterAll(() => {
})

test("practices table exists", async () => {
  const tables = await db.tables()
  await expect(tables).toContain("practices")
})

test.todo("only authenticated users can create practice in DB")
test.todo("public practices can be retrieved by anyone")
test.todo("private practices can only be retrieved by the user")
test.todo("practices can be graphed")
test.todo("user can practice an exercise")
test.todo("user can practice a song")
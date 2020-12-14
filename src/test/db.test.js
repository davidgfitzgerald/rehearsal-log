import { Database } from "../db/Database";

const db_name = "rehearsal_log_test"
let db = null;

beforeAll(() => {
  db = new Database();
})

afterAll(() => {
  db.close()
})

test("NODE_ENV is test", () => {
  expect(process.env.NODE_ENV).toBe("test");
})

test("Can receive a global variable from setupTests.js", () => {
  expect(global.testVariable).toBe(42)
})

test(`${db_name} database exists`, async () => {
  expect(db.name).toBe(db_name)

  const databases = await db.showDatabases();
  expect(databases.some(row => row["Database"] === db_name)).toBeTruthy()
})

test("Can connect to DB:", async () => {
  expect(await db.canConnect()).toBeTruthy()
})
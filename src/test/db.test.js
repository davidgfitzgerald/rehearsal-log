import { Database } from "../db/Database";
const db_name = "rehearsal_log_test"

test("environment should be test", () => {
  expect(process.env.NODE_ENV).toBe("test");
})

test("rehearsal_log_test database exists", async () => {
  const db = new Database();
  expect(db.name).toBe(db_name)

  const databases = await db.showDatabases();
  expect(databases.some(row => row["Database"] === db_name)).toBe(true)
  await db.close()
})
import { Database } from '../../db/Database'
let db;

beforeAll(async() => {
  db = new Database();
})

afterAll(() => {
  db.close()
})
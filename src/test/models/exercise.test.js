import {Exercise} from "../../models";
import { Database } from "../../db/Database";
import { tableExists} from "../common";

let db;

beforeAll(async () => {
  db = new Database();
})

beforeEach(async () => {
  await Exercise.sync()
})

test("exercises table exists", () => {
  tableExists("exercises", db)
})

describe("exercise CRUD", () => {
  let exercise;
  let exercise_id;

  test("can create exercise", async () => {
    exercise = await Exercise.create({
      name: "Single Stroke Roll",
      instrument: "drums"
    })
    const ex_json = exercise.toJSON()
    exercise_id = ex_json.id
    expect(ex_json).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: "Single Stroke Roll",
      instrument: "drums"
    }))
  })

  test("can update exercise", async () => {
    exercise.name = "Double Stroke Roll"
    await exercise.save()
  })

  test("can get exercise", async() => {
    exercise = await Exercise.findOne({
      where: {
        id: exercise_id
      }
    })
    expect(exercise.name).toBe("Double Stroke Roll")
  })

  test("can delete exercise", async () => {
    await exercise.destroy()
  })
})


test.todo("only authenticated users can create exercise in DB")
test.todo("public exercises can be retrieved")
test.todo("design choice: are exercises recreated for each user or is there one master exercises table")
test.todo("user can add public exercise to their exercises")
test.todo("calculate threshold for exercise")

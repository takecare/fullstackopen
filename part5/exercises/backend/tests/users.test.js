const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  //
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

describe("creating users", () => {
  test("creating a user successfully", async () => {
    const user = { name: "nome", username: "username", password: "password" };
    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("invalid password", async () => {
    const user = { name: "nome", username: "username", password: "p" };
    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect(/Password has to be at least/);
  });

  test("invalid username", async () => {
    const user = { name: "nome", username: "u", password: "password" };
    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect(/Username has to be at least/);
  });
});

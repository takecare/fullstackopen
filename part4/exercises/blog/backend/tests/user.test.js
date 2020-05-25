const fixtures = require("./fixtures").blogs;
const mongoose = require("../utils/mongoose");
const User = require("../models/user");

beforeAll(() => {
  mongoose.connect();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("user model", () => {
  describe("when creating a new user", () => {
    test("the username property is mandatory", async () => {
      const check = async () =>
        await User.create({ name: "x", passwordHash: "y" });
      expect(check()).rejects.toThrow(/User validation failed/);
    });

    test("the name property is mandatory", async () => {
      const check = async () =>
        await User.create({ username: "x", passwordHash: "y" });
      expect(check()).rejects.toThrow(/User validation failed/);
    });

    test("the passwordHash property is mandatory", async () => {
      const check = async () => await User.create({ name: "x", username: "y" });
      expect(check()).rejects.toThrow(/User validation failed/);
    });
  });

  describe("when converting to json", () => {
    it("the result should contain an id property", async () => {
      const result = await User.create({
        name: "name",
        username: "username",
        passwordHash: "passwordHash",
      });
      const user = result.toJSON();
      expect(user.id).toBeDefined();
    });
  });
});

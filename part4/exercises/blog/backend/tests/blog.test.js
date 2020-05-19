const fixtures = require("./fixtures").blogs;
const mongoose = require("../utils/mongoose");
const Blog = require("../models/blog");

beforeAll(() => {
  mongoose.connect();
});

afterEach(async () => {
  await Blog.deleteMany({});
});

describe("model", () => {
  describe("conversion to json", () => {
    it("should contain an id property", async () => {
      const blog = {
        title: "a title",
        author: "an author",
        url: "a url",
        likes: 23,
      };
      const savedBlog = await new Blog(blog).save();
      const result = savedBlog.toJSON();
      expect(result.id).toBeDefined();
    });
  });
});

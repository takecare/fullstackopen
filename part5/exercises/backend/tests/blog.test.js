const mongoose = require("../utils/mongoose");
const Blog = require("../models/blog");

beforeAll(() => {
  mongoose.connect();
});

afterEach(async () => {
  await Blog.deleteMany({});
});

describe("blog model", () => {
  describe("when creating a blog instance", () => {
    test("the 'likes' property defaults to 0", async () => {
      const blog = {
        title: "some title",
        author: "some author",
        url: "some url",
      };
      const savedBlog = await new Blog(blog).save();
      expect(savedBlog.likes).toBe(0);
    });
  });

  describe("when converting to json", () => {
    it("the result should contain an id property", async () => {
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

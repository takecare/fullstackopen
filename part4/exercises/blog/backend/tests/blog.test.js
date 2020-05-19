const fixtures = require("./fixtures");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  const createBlogs = fixtures.blogs.map((blog) => new Blog(blog).save);
  const results = await Promise.all(createBlogs);
  results.forEach((result, i) => (fixtures.blogs[i].id = result.id));
});

afterEach(async () => {
  await Blog.deleteMany({});
});

describe("creating blogs", () => {
  test("can add a new blog", async () => {
    const response = await api
      .post("/api/blogs")
      .send(fixtures.blogs[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newBlog = response.body;
    expect({
      title: newBlog.title,
      author: newBlog.author,
      likes: newBlog.likes,
      url: newBlog.url,
    }).toEqual({
      title: fixtures.blogs[0].title,
      author: fixtures.blogs[0].author,
      likes: fixtures.blogs[0].likes,
      url: fixtures.blogs[0].url,
    });
  });
});

describe("reading blogs", () => {
  test("can retreive all blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = response.body;
    blogs.forEach((blog, i) => {
      expect({
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
      }).toEqual({
        title: fixtures.blogs[i].title,
        author: fixtures.blogs[i].author,
        likes: fixtures.blogs[i].likes,
        url: fixtures.blogs[i].url,
      });
    });
  });
});

describe("updating blogs", () => {
  //
});

describe("deleting blogs", () => {
  //
});

afterAll(() => {
  mongoose.connection.close();
});

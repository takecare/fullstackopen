const fixtures = require("./fixtures");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  const createBlogs = fixtures.blogs.map((blog) => new Blog(blog).save());
  const results = await Promise.all(createBlogs);
});

afterEach(async () => {
  await Blog.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

describe("creating blogs", () => {
  test("can add a new blog", async () => {
    const allBlogs = await getAll();
    const count = allBlogs.body.length;

    const blog = {
      title: "a title",
      author: "an author",
      url: "a url",
      likes: 23,
    };
    const response = await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedAllBlogs = await getAll();
    const updatedCount = updatedAllBlogs.body.length;
    expect(updatedCount).toEqual(count + 1);

    const newBlog = response.body;
    expect({
      title: newBlog.title,
      author: newBlog.author,
      likes: newBlog.likes,
      url: newBlog.url,
    }).toEqual({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
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
    expect(blogs).toHaveLength(fixtures.blogs.length);
  });
});

describe("updating blogs", () => {
  //
});

describe("deleting blogs", () => {
  //
});

const getAll = async () => await api.get("/api/blogs");

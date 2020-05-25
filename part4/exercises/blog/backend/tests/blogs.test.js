const fixturesData = require("./fixtures");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const fixtures = {
  blogs: fixturesData.blogs,
  blogIds: [],
  users: fixturesData.users,
};

beforeEach(async () => {
  const createBlogs = fixtures.blogs.map((blog) => new Blog(blog).save());
  const result = await Promise.all(createBlogs);
  result.forEach((blog, index) => (fixtures.blogIds[index] = blog.id));

  const createUsers = fixtures.users.map((user) => User.create(user));
  const createUsersResult = await Promise.all(createUsers);
});

afterEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
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

  test("can't add a blog without title", async () => {
    const blog = {
      author: "an author",
      url: "a url",
      likes: 23,
    };
    await api.post("/api/blogs").send(blog).expect(400);
  });

  test("can't add a blog without url", async () => {
    const blog = {
      author: "an author",
      title: "a title",
      likes: 23,
    };
    await api.post("/api/blogs").send(blog).expect(400);
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
  test("can update a field", async () => {
    const id = fixtures.blogIds[0];
    const response = await api
      .put(`/api/blogs/${id}`)
      .send({ title: "xyz" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blog = response.body;
    expect(blog.title).toBe("xyz");
  });
});

describe("deleting blogs", () => {
  test("can delete a single blog", async () => {
    const id = fixtures.blogIds[0];
    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});

const getAll = async () => await api.get("/api/blogs");

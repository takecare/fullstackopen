const fixturesData = require("./fixtures");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const fixtures = {
  blogs: fixturesData.blogs,
  users: fixturesData.users,
};

let token = "";

beforeAll(async () => {
  token = await login();
});

beforeEach(async () => {
  const createBlogs = fixtures.blogs.map((blog) => new Blog(blog).save());
  await Promise.all(createBlogs);

  const createUsers = fixtures.users.map((user) => User.create(user));
  await Promise.all(createUsers);
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
      .set("Authorization", `Bearer ${token}`)
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
    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("can't add a blog without url", async () => {
    const blog = {
      author: "an author",
      title: "a title",
      likes: 23,
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
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
    const blog = await createBlog(aBlog(), token);

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send({ title: "xyz" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe("xyz");
  });
});

describe("deleting blogs", () => {
  test("can delete a single blog", async () => {
    const blog = await createBlog(aBlog(), token);
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  test("cannot delete blog if no auth is provided", async () => {
    const blog = await createBlog(aBlog(), token);
    await api.delete(`/api/blogs/${blog.id}`).expect(401);
  });

  test("cannot delete blog if not original creator", async () => {
    const blog = await createBlog(aBlog(), token);

    const anotherToken = login();

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .expect(401);
  });
});

const login = async () => {
  await User.deleteOne({ username: "testuser" });
  await api.post("/api/users").send({
    name: "testuser",
    username: "testuser",
    password: "testuser",
  });

  const response = await api
    .post("/api/login")
    .send({ username: "testuser", password: "testuser" });

  return response.body.token;
};

const getAll = async () => await api.get("/api/blogs");

const createBlog = async (blog, token) => {
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  return response.body;
};

const aBlog = () => ({
  title: `title ${Math.random()}`,
  author: `author ${Math.random()}`,
  url: `url ${Math.random()}`,
});

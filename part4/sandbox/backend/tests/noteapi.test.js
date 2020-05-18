const mongoose = require("mongoose");
const supertest = require("supertest");
const Note = require("../models/note");
const app = require("../app");
const notes = require("./fixtures");

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(notes[0]);
  await noteObject.save();

  noteObject = new Note(notes[1]);
  await noteObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(notes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

test("a valid note is added", async () => {
  const newNote = { content: "a new note", important: false };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");
  const notes = response.body.map((res) => res.content);

  expect(notes).toHaveLength(notes.length + 1);
  expect(notes).toContain("a new note");
});

test("empty note can't be added", async () => {
  const newNote = { important: false };

  await api.post("/api/notes").send(newNote).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});

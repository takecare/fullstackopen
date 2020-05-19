const mongoose = require("mongoose");
const supertest = require("supertest");
const Note = require("../models/note");
const app = require("../app");
const notes = require("./fixtures").notes;

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  const createNotes = notes.map((note) => new Note(note).save());
  const results = await Promise.all(createNotes);
  results.forEach((result, i) => (notes[i].id = result.id));
});

describe("fetching notes", () => {
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

  test("can fetch an individual note", async () => {
    const notesResponse = await api.get("/api/notes");
    const aNote = notesResponse.body[0];

    const response = await api.get(`/api/notes/${aNote.id}`).expect(200);
    const note = response.body;

    expect(note).toEqual(aNote);
  });
});

describe("adding notes", () => {
  test("a valid note is added", async () => {
    // this test isn't great as we're relying on creating a new note every time

    const newNote = { content: "a new note", important: false };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");
    const notesContent = response.body.map((note) => note.content);

    expect(notesContent).toHaveLength(notes.length + 1);
    expect(notesContent).toContain("a new note");
  });

  test("empty note can't be added", async () => {
    const newNote = { important: false };

    await api.post("/api/notes").send(newNote).expect(400);
  });
});

describe("deleting notes", () => {
  test("can delete a specific note", async () => {
    await api.delete(`/api/notes/${notes[0].id}`).expect(204);
  });
});

describe("updating a note", () => {
  test("should update the note", async () => {
    const note = {
      important: Math.random() < 0.5,
      content: `${Math.random()}`,
    };
    const response = await api
      .put(`/api/notes/${notes[0].id}`)
      .send(note)
      .expect(200);

    const updatedNote = response.body;

    expect(updatedNote.content).toEqual(note.content);
    expect(updatedNote.important).toEqual(note.important);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

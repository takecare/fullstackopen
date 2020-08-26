const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {});
let savedUser;

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ name: 'root', username: 'root', passwordHash });

    savedUser = await user.save();
  });

  test('can retrieve user by id', async () => {
    const result = await api.get(`/api/users/${savedUser.id}`).send();
    const user = result.body;
    expect(user.name).toBe(savedUser.name);
  });

  test('creation succeeds with a fresh username', async () => {
    let users = await User.find({});
    const usersAtStart = users.map((u) => u.toJSON());

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    users = await User.find({});
    const usersAtEnd = users.map((u) => u.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    let users = await User.find({});
    const usersAtStart = users.map((u) => u.toJSON());

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('`username` to be unique');

    users = await User.find({});
    const usersAtEnd = users.map((u) => u.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

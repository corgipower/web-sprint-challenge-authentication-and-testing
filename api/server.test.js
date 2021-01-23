require("dotenv").config();
const supertest = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

beforeAll(async () => {
  await db.seed.run();
})

afterAll(async () => {
  await db.destroy();
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('testing auth', () => {
  it('registers a user', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      username: 'tyr',
      password: 'tyr',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body[0].username).toBe('tyr');
  })
  let token = '';
  it('logs in a user', async () => {
    const res = await supertest(server).post('/api/auth/login').send({
      username: 'tyr',
      password: 'tyr',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('welcome, tyr');
    token = res.body.token;
  })

  it('gets jokes', async () => {
    const res = await supertest(server).get('/api/jokes').set('Cookie', `token = ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  })
})

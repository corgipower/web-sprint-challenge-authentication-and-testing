const supertest = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

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

  it('logs in a user', async () => {
    const res = await supertest(server).post('/api/auth/login').send({
      username: 'tyr',
      password: 'tyr',
    });
    console.log(res.message)
    expect(res.statusCode).toBe(200);
  })
})

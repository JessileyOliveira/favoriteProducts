const { generateFakeCustomer } = require('../utils/faker');
const app = require('../../src/app');
const request = require('supertest');

describe('Authenticate tests', () => {
  it('should return a JWT Token with valid parameters', async () => {
    const fakeCustomer = generateFakeCustomer();

    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'LuizaLabsUser', password: 'LuizaLabsPassword' });

    expect(response.body).toHaveProperty('token');
  });

  it('should return status 404 when sent invalid parameters', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'NoUser', password: 'NoPassword' });

    expect(response.status).toBe(404);
  });

  it('should return status 400 when dont sent username', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ password: 'LuizaLabsPassword' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Username not informed!');
  });

  it('should return status 400 when dont sent password', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'LuizaLabsUser' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password not informed!');
  });
});

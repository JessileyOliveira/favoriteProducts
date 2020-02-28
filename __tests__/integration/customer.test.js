const request = require('supertest');
const app = require('../../src/app');
const { generateFakeCustomer } = require('../utils/faker');

describe('Customer tests', () => {
  it('should add a new customer and return status 201', async () => {
    const response = await request(app)
      .post('/customers')
      .send(generateFakeCustomer());

    expect(response.status).toBe(201);
  });

  it('should return status 400 if email is duplicated', async () => {
    const fakeCustomer = generateFakeCustomer();
    await request(app)
      .post('/customers')
      .send(fakeCustomer);
    const response = await request(app)
      .post('/customers')
      .send(fakeCustomer);

    expect(response.status).toBe(400);
  });

  it('should return status 400 in case of error', async () => {
    const response = await request(app)
      .post('/customers')
      .send({ name: 'teste' });

    expect(response.status).toBe(400);
  });
});

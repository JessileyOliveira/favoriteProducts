const Customer = require('../../src/app/models/Customer');
const { generateFakeCustomer } = require('../utils/faker');
const app = require('../../src/app');
const request = require('supertest');

describe('Authenticate tests', () => {
  it('should return a JWT Token with a valid email', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);

    const response = await request(app)
      .post('/authenticate')
      .send({ email: customer.email });

    expect(response.body).toHaveProperty('token');
  });

  it('should return status 404 when sent invalid email', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ email: 'EmailNotRegistred@notRegistred.com' });

    expect(response.status).toBe(404);
  });

  it('should return status 404 when sent empty email', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({});

    expect(response.status).toBe(400);
  });
});

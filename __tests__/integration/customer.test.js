const request = require('supertest');
const app = require('../../src/app');
const { generateFakeCustomer } = require('../utils/faker');
const Customer = require('../../src/app/models/Customer');

describe('Customer tests - store', () => {
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

describe('Customer tests - index', () => {
  it('should return a customer', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const response = await request(app)
      .get(`/customers/${customer.id}`)
      .send();

    expect(response.body).toHaveProperty('id');
  });

  it('should return status 404 when sent id not exist', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    await customer.destroy();
    const response = await request(app)
      .get(`/customers/${customer.id}`)
      .send();

    expect(response.status).toBe(404);
  });

  it('should return status 400 when sent an invalid id', async () => {
    const response = await request(app)
      .get(`/customers/abc`)
      .send();

    expect(response.status).toBe(400);
  });
});

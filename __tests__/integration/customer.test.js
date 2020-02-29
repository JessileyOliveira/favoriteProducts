const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const { generateFakeCustomer } = require('../utils/faker');
const Customer = require('../../src/app/models/Customer');
const authConfig = require('../../src/config/auth');

describe('Customer tests', () => {
  it('should add a new customer and return status 201 (store)', async () => {
    const response = await request(app)
      .post('/customers')
      .send(generateFakeCustomer());

    expect(response.status).toBe(201);
  });

  it('should return status 400 if email is duplicated (store)', async () => {
    const fakeCustomer = generateFakeCustomer();
    await Customer.create(fakeCustomer);
    const response = await request(app)
      .post('/customers')
      .send(fakeCustomer);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Duplicated email');
  });

  it('should return status 400 in case of error (store)', async () => {
    const response = await request(app)
      .post('/customers')
      .send({ name: 'teste' });

    expect(response.status).toBe(400);
  });

  it('should return a customer (index)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    const response = await request(app)
      .get(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.body).toHaveProperty('id');
  });

  it('should return status 404 when customer was deleted (index)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    await customer.destroy();
    const response = await request(app)
      .get(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });

  it('should update a customer (update)', async () => {
    let fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    fakeCustomer.name = 'NewName';
    fakeCustomer.email = 'NewEmail';
    const response = await request(app)
      .put(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send({ name: fakeCustomer.name, email: fakeCustomer.email });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body.name).toBe('NewName');
    expect(response.body.email).toBe('NewEmail');
  });

  it('should return status 400 if email is duplicated (update)', async () => {
    let fakeCustomer = generateFakeCustomer();
    await Customer.create({
      name: 'customer name',
      email: 'customer@email.com',
    });

    const customer = await Customer.create(fakeCustomer);
    const token = await jwt.sign({ id: customer.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/customers')
      .set('authorization', `Baerer ${token}`)
      .send({ name: fakeCustomer.name, email: 'customer@email.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Duplicated email');
  });

  it('should return status 404 when customer was deleted (update)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    await customer.destroy();
    const response = await request(app)
      .put(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send({ name: fakeCustomer.name, email: 'customer@email.com' });

    expect(response.status).toBe(404);
  });

  it('should delete a customer (destroy)', async () => {
    let fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    const response = await request(app)
      .delete(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send();

    const customerAfterDestroy = await Customer.findOne({
      where: { email: customer.email },
    });
    expect(response.status).toBe(200);
    expect(customerAfterDestroy).toBeNull();
  });

  it('should return status 404 when customer was deleted (destroy)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
    await customer.destroy();
    const response = await request(app)
      .delete(`/customers`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
  });
});

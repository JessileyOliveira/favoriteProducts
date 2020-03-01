const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const { generateFakeCustomer } = require('../utils/faker');
const Customer = require('../../src/app/models/Customer');
const CustomerFavoriteProducts = require('../../src/app/models/CustomerFavoriteProducts');
const authConfig = require('../../src/config/auth');
const getListProduct = require('../utils/getListProduct');

describe('Favorite products tests', () => {
  let token;
  let productId;

  beforeAll(async () => {
    token = jwt.sign(
      {
        username: 'LuizaLabsUser',
        password: 'LuizaLabsPassword',
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    const productList = await getListProduct(1);

    productId = productList.data.products[0].id;
  });
  it('should be able add a favorite product (store)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);

    const response = await request(app)
      .post(`/customers/${customer.id}/favoriteproduct/${productId}`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
  it('should return error when product id invalid (store)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);

    const response = await request(app)
      .post(`/customers/${customer.id}/favoriteproduct/-invalidValue-`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Product not found!');
  });
  it('should return error when customer id invalid (store)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    await customer.destroy();
    const response = await request(app)
      .post(`/customers/${customer.id}/favoriteproduct/${productId}`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Customer not found!');
  });
  it('should return error when product id already exists customers favorite list (store)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    const productList = await getListProduct(1);
    const product = productList.data.products[0];
    await CustomerFavoriteProducts.create({
      customer_id: customer.id,
      product_id: product.id,
      product_title: product.title,
      product_image: product.image,
      product_price: product.price,
    });

    const response = await request(app)
      .post(`/customers/${customer.id}/favoriteproduct/${productId}`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'The product already exists on the customers favorite list!'
    );
  });

  it('should be able remove a favorite product (destroy)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);

    const response = await request(app)
      .delete(`/customers/${customer.id}/favoriteproduct/${productId}`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
  it('should return error when product id invalid (destroy)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);

    const response = await request(app)
      .delete(`/customers/${customer.id}/favoriteproduct/-invalidValue-`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Product not found!');
  });
  it('should return error when customer id invalid (destroy)', async () => {
    const fakeCustomer = generateFakeCustomer();
    const customer = await Customer.create(fakeCustomer);
    await customer.destroy();
    const response = await request(app)
      .delete(`/customers/${customer.id}/favoriteproduct/${productId}`)
      .set('authorization', `Baerer ${token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Customer not found!');
  });
});

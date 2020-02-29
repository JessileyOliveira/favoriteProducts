const request = require('supertest');
const app = require('../../src/app');

describe('Authorization tests', () => {
  it('should return a message "Token not provided" when token not provided', async () => {
    const response = await request(app)
      .get(`/customers`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token not provided!');
  });

  it('should return a message "Invalid token" when token is invalid', async () => {
    const response = await request(app)
      .get(`/customers`)
      .set('authorization', `False token`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token!');
  });
});

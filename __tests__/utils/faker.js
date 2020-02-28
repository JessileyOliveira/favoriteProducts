const faker = require('faker');

function generateFakeCustomer() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
  };
}

module.exports = {
  generateFakeCustomer,
};

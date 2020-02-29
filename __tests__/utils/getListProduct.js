const axios = require('axios');

const apiProduct = require('../../src/app/services/apiProduct');

async function getListProduct(page) {
  return await apiProduct.get(`/api/product/?page=${page}`);
}

module.exports = getListProduct;

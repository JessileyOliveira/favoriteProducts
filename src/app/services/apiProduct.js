const axios = require('axios');

const api = axios.create({
  baseURL: 'http://challenge-api.luizalabs.com',
});

module.exports = api;

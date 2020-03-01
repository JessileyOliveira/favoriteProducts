require('dotenv/config');

const app = require('./app');

app.listen(process.env.SERVER_POST || 3333);

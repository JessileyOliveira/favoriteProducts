require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST || '192.168.99.100',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  database: 'favoriteproducts',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

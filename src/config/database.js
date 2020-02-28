module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'favoriteproducts',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

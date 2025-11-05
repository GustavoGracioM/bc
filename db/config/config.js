require('dotenv').config(); // garante que o .env é carregado
console.log('ENV VARS ->', {
  DB_USER: 'postgres',
  DB_NAME: 'postgres',
  DB_HOST: '172.18.0.1',
});

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
};

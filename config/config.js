const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER || 'dev_user',
    password: process.env.DB_PASSWORD || 'dev_password',
    database: process.env.DB_NAME || 'dev_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  },
};

module.exports = config[environment];

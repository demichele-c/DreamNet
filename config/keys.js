//config/keys.js

require('dotenv').config();

module.exports = {
  secret: process.env.SECRET_KEY,
  apiKey: process.env.API_KEY
};

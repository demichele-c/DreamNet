// Load environment variables from a .env file into process.env
require('dotenv').config();

// Export an object containing the secret and API key
module.exports = {
  // Secret key, typically used for signing or encrypting sensitive information
  secret: process.env.SECRET_KEY, // Retrieve the SECRET_KEY from environment variables

  // API key, often used for authenticating with external services or APIs
  apiKey: process.env.API_KEY // Retrieve the API_KEY from environment variables
};

// // Determine the environment (development or production)
// // If NODE_ENV is not set, default to 'development'
// const environment = process.env.NODE_ENV || 'development';

// // Configuration object for different environments
// const config = {
//   // Development environment settings
//   development: {
//     // Database username, use environment variable or default to 'dev_user'
//     username: process.env.DB_USER || 'dev_user',
//     // Database password, use environment variable or default to 'dev_password'
//     password: process.env.DB_PASSWORD || 'dev_password',
//     // Database name, use environment variable or default to 'dev_database'
//     database: process.env.DB_NAME || 'dev_database',
//     // Database host, use environment variable or default to '127.0.0.1' (localhost)
//     host: process.env.DB_HOST || '127.0.0.1',
//     // Specify the type of database being used (PostgreSQL in this case)
//     dialect: 'postgres',
//     // Port to connect to the database, use environment variable or default to 5432
//     port: process.env.DB_PORT || 5432,
//   },
//   // Production environment settings
//   production: {
//     // Database username, use environment variable (no default, for security)
//     username: process.env.DB_USER,
//     // Database password, use environment variable (no default, for security)
//     password: process.env.DB_PASSWORD,
//     // Database name, use environment variable (no default, for security)
//     database: process.env.DB_NAME,
//     // Database host, use environment variable (no default, for security)
//     host: process.env.DB_HOST,
//     // Specify the type of database being used (PostgreSQL in this case)
//     dialect: 'postgres',
//     // Port to connect to the database, use environment variable (no default, for security)
//     port: process.env.DB_PORT,
//   },
// };

// // Export the configuration for the current environment
// // This allows the rest of the application to use the appropriate settings
// module.exports = config[environment];

console.log('Starting test script...');

const { User, sequelize } = require('./models'); // Ensure this path is correct

// Ensure the connection to the database is established
sequelize.authenticate()
    .then(() => console.log('Database connection established.'))
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the script on error
    });

// Create a new user
User.create({ username: 'testuser', password: 'testpassword' })
    .then(user => console.log('User created:', user))
    .catch(err => console.error('Error creating user:', err));

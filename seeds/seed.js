const sequelize = require('../config/connection'); // Import the sequelize instance configured with the database connection
const { User, Dream } = require('../models'); // Import the User and Dream models
const userData = require('./userData.json'); // Import user data from JSON file
const dreamData = require('./dreamData.json'); // Import dream data from JSON file

const seedDatabase = async () => {
  try {
    // Sync database and drop existing tables
    console.log('Syncing database and dropping existing tables...');
    await sequelize.sync({ force: true }); // Drop all tables and recreate them

    // Create users
    console.log('Creating users...');
    const users = await User.bulkCreate(userData, {
      individualHooks: true, // Apply hooks for each user
      returning: true, // Return the created users
    });

    // Create dreams with corresponding user_id
    console.log('Creating dreams...');
    for (const dream of dreamData) {
      // Ensure that each dream references an existing user
      const user = users.find(user => user.id === dream.user_id); // Find the user associated with the dream
      if (user) {
        // Create dream with the correct user_id
        await Dream.create({
          ...dream, // Spread the dream data
          user_id: user.id, // Ensure the correct user_id is assigned
        });
      } else {
        console.warn(`User with ID ${dream.user_id} not found for dream: ${dream.name}`); // Warn if the user ID is not found
      }
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err); // Log any errors during seeding
  } finally {
    // Close the database connection after seeding
    await sequelize.close(); // Ensure the connection is closed properly
    process.exit(0); // Exit the process
  }
};

seedDatabase(); // Execute the seeding function

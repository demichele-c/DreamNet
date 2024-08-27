const sequelize = require('../config/connection');
const { User, Dream } = require('../models');

const userData = require('./userData.json');
const dreamData = require('./dreamData.json');

const seedDatabase = async () => {
  try {
    // Sync database and drop existing tables
    await sequelize.sync({ force: true });

    // Create users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Create dreams with corresponding user_id
    for (const dream of dreamData) {
      await Dream.create(dream);
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();

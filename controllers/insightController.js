const { Dream } = require('../models');

const generateInsight = async (description) => {
  // Replace with actual API call to AI service
  return `Insight for: ${description}`;
};

exports.getInsights = async (req, res) => {
  try {
    const dreams = await Dream.findAll();
    const insights = await Promise.all(dreams.map(dream => generateInsight(dream.description)));
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

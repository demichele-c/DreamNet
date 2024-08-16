const { Dream } = require('../models');

exports.createDream = async (req, res) => {
  try {
    const { description, date, tags } = req.body;
    const userId = req.session.userId;
    await Dream.create({ description, date, tags, userId });
    res.status(201).json({ message: 'Dream logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getDreams = async (req, res) => {
  try {
    const { date, tags, keyword } = req.query;
    const query = {};
    if (date) query.date = date;
    if (tags) query.tags = { [Op.like]: `%${tags}%` };
    if (keyword) query.description = { [Op.like]: `%${keyword}%` };
    
    const dreams = await Dream.findAll({ where: query });
    res.json(dreams);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

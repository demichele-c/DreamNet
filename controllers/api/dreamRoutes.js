const router = require('express').Router();
const { Dream } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new dream and generate DALL-E image
router.post('/', withAuth, async (req, res) => {
  try {
    const newDream = await Dream.create({
      name: req.body.name, // Ensure 'name' is correctly handled
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDream);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;

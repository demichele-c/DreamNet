//controllers/api/dreamRoutes.js
const router = require('express').Router();
const { Dream } = require('../../models');
const withAuth = require('../../utils/auth');
require("dotenv").config();
const OpenAI = require("openai");

// Route to create a new dream and generate DALL-E image
router.post('/', withAuth, async (req, res) => {
  try {
    // Save the dream to the database
    const newDream = await Dream.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Use DALL-E to generate an image based on the dream description
    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });

    const imageResponse = await client.images.generate({
      prompt: req.body.description,
      n: 1, // Number of images to generate
      size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url; // Get the URL of the generated image

    // Update the dream entry with the image URL
    newDream.image_url = imageUrl;
    await newDream.save();

    res.status(200).json(newDream);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to view a specific dream's image
router.get('/:id', withAuth, async (req, res) => {
  try {
    const dreamData = await Dream.findByPk(req.params.id);

    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    const dream = dreamData.get({ plain: true });

    res.render('view-dream', {
      ...dream,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/:id', withAuth, async (req, res) => {
  try {
    const dreamData = await Dream.findByPk(req.params.id);

    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    const dream = dreamData.get({ plain: true });

    res.render('view-dream', {
      ...dream,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

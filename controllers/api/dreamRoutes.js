const router = require('express').Router();
const { Dream } = require('../../models');
const withAuth = require('../../utils/auth');
require("dotenv").config();
const OpenAI = require("openai");

// Route to create a new dream
router.post('/', withAuth, async (req, res) => {
  try {
    const newDream = await Dream.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newDream);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get all dreams for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dreams = await Dream.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.render('dreams', { 
      dreams: dreams.map(dream => dream.get({ plain: true })),
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single dream by id for editing
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dreamData = await Dream.findByPk(req.params.id);

    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    const dream = dreamData.get({ plain: true });

    res.render('edit-dream', {
      ...dream,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a dream by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updated] = await Dream.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updated) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Dream updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a dream by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dreamData = await Dream.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    res.status(200).json(dreamData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/interpret-dream", async (req, res) =>{
  const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});
  
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content:JSON.stringify(req.body)}],
      model: 'gpt-3.5-turbo',
    });
    console.log("Response: ", chatCompletion)
    res.json(chatCompletion.choices)
    
  } catch (error) {
    console.log("err: ", error);
    res.json({ msg: error}) 
  }
}) 


module.exports = router;

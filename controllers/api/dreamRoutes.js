const router = require('express').Router();
const { Dream } = require('../../models');
const withAuth = require('../../utils/auth');
require("dotenv").config();
const OpenAI = require("openai");

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

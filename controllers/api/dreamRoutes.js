// File: controllers/api/.js

const router = require('express').Router();
const { Dream } = require('../../models');
const withAuth = require('../../utils/auth');
require("dotenv").config();
const OpenAI = require("openai");

// Route to create a new dream and generate DALL-E image
router.post('/', withAuth, async (req, res) => {
    // --> Do we request from the OPEN_API BEFORE we save the record to the database
    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
    
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content:JSON.stringify(req.body.description)}],
        model: 'gpt-3.5-turbo',
      });
      //console.log("Response: ", chatCompletion)
      console.log("Interpretation: ", chatCompletion.choices[0].message.content)
      const responseData =  chatCompletion.choices[0].message.content;
    //  res.json(chatCompletion.choices)
      
      const newDream = await Dream.create({
        name: req.body.name, // Ensure 'name' is correctly handled
        description: req.body.description,
        user_id: req.session.user_id,
      });

      console.log("New Dream: ", newDream.dataValues)
      res.status(200).json(responseData);
    } catch (error) {
      console.log("err: ", error);
      res.json({ msg: error}) 
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
}); 

module.exports = router;

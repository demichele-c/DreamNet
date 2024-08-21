const express = require('express');
const router = express.Router();
const Interpretation = require('../models/interpretations');
const OpenAI = require('openai');

// Route to display the form and list of interpretations
router.get('/', async (req, res) => {
    try {
        const interpretationsData = await Interpretation.findAll();
        const interpretations = interpretationsData.map((interpretation) => interpretation.get({ plain: true }));
        res.render('interpretation', { interpretations });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to handle form submission and generate interpretation
router.post('/', async (req, res) => {
    try {
        const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

        const dreamContent = req.body.dream_description;
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: dreamContent }],
            model: 'gpt-3.5-turbo',
        });

        const interpretationText = chatCompletion.choices[0].message.content;

        // Save the interpretation in the database
        await Interpretation.create({
            dream_description: dreamContent,
            interpretation_text: interpretationText,
        });

        res.json({ interpretationText });
    } catch (err) {
        console.error('Error generating interpretation:', err);
        res.status(500).json({ error: 'Failed to interpret dream' });
    }
});

module.exports = router;

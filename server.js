const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

// Set up Handlebars
const hbs = exphbs.create({ 
    defaultLayout: 'main', 
    extname: '.handlebars'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,  // Session secret loaded from .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in production
}));

// Set up OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

// Import routes
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');
const interpretationRoutes = require('./controllers/interpretationController'); // New import

// Use routes
app.use('/api', apiRoutes);
app.use('/', viewRoutes);
app.use('/interpretations', interpretationRoutes); // New route

// Additional route for interpreting dreams (existing)
app.post('/interpret-dream', async (req, res) => {
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: JSON.stringify(req.body) }],
            model: 'gpt-3.5-turbo',
        });
        res.json(chatCompletion.choices);
    } catch (error) {
        console.error('Error interpreting dream:', error);
        res.status(500).json({ error: 'Failed to interpret dream' });
    }
});

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

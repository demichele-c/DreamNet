const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const { Sequelize } = require('sequelize');
const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');
const authMiddleware = require('./util/auth');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new (require('connect-pg-simple')(session))({ pool: new Sequelize() }),
  secret: keys.secret,
  resave: false,
  saveUninitialized: false
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

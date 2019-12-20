const express = require('express');
//const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
//1-MIDDLEWARES

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));
app.get('/electrical', (req, res) => {
  res.sendFile('electrical.html', { root: __dirname });
});
//app.use(express.static(path.join(__dirname, 'resources')));

//const overview = fs.readFileSync(`${__dirname}/index.html`);

/* app.get('/', (req, res) => {
  res.status(200).sendFile('index.html', { root: __dirname });
});
 */
//STARTING SERVER

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const Orders = require('./models/Orders');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));

app.use('/users', require('./routes/users.js'));

app.get('/register', function(req, res) {
  res.render('register');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/dashboard', (req, res) => {
  const { name, phone, service, address } = req.body;
  const newOrder = new Orders({ name, phone, service, address });
  newOrder.save();
  res.end();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

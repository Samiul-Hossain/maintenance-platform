const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  //res.render('dashboard', {
    //user: req.user
  //})
  res.sendfile('booking.html', {'root': __dirname}));

 //res.sendFile('../booking.html', { root: __dirname });


module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const {createUserCart} = require('../cart/controllers/cartControllers');
const {register} = require('./controllers/userController');
const User = require('../users/models/User');
require('../../lib/passport');

const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation')

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource')
});

// register routes
router.get('/register', (req, res) => {
    res.render('auth/register', {errors: req.flash('errors') })
});

router.post('/register', userValidation, register, createUserCart);

router.get('/login' , (req, res) => {
    return res.render('auth/login', {errors: req.flash('errors') })
});

// login routes
router.post(
    'login',
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/api/users/login',
        failureFlash: true
    })
);

// profile routes



module.exports = router
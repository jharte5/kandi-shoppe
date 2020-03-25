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
    res.render('auth/register', {errors: req.flash('errors'), login: false })
});

router.post('/register', userValidation, register);

router.get('/login' , (req, res) => {
    return res.render('auth/register', {errors: req.flash('errors'),  login:  true })
});

router.get('/logout', (req, res) => {
 req.logOut();
 session.destroy()
 res.redirect('/sweets')
}
)

// login routes
router.post(
    '/login',
    passport.authenticate('local-login', {
        successRedirect: '/sweets',
        failureRedirect: '/users/login',
        failureFlash: true
    })
);

// profile routes
router.get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.render('auth/profile');
    } else {
        return res.send('Unauthorized');
    }
});
router.put('/update-profile', (req, res, next) => {
    userController
        .updateProfile(req.body, req.user._id)
        .then(user => {
        return res.redirect('/api/users/profile');
        })
        .catch(err => {
        console.log(err);
        return res.redirect('/api/users/update-profile');
        });
});
router.get('/update-profile', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('auth/update-profile');
    }
    return res.redirect('/');
});

//update password
router.put('/update-password', (req, res) => {
    userController
        .updatePassword(req.body, req.user._id)
        .then(user => {
        return res.redirect('/api/users/profile');
        })
        .catch(err => {
        console.log('Error in route');
        return res.redirect('/api/users/update-profile');
        });
});

module.exports = router
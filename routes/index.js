const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('main/home', { title: 'Kandi Shoppe' });
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

module.exports = router;

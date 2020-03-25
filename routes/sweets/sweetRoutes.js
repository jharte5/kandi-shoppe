const express = require('express');
const router = express.Router();
const Sweet = require('./models/Sweets');

router.get('/', (req, res, next) => {
    Sweet.findOne
});

module.exports = router
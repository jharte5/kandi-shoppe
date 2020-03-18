const router = require('express').Router();
const Product = require('./products/models/Product');

const categoryValidation = require('./validation/categoryValidation');
const { addProducts } = require('./products/controllers/productControllers');
const {
    getAddCategory,
    createCategory
} = require('./categories/controllers/categoryControllers');

router.get('/add-category', getAddCategory);
router.post('/add-category', categoryValidation, createCategory);
router.get('/add-products/:name', addProducts);

module.exports = router;
const router = require('express').Router();
const {getAllCategories} = require('../controllers/category/category.controller');

router.get('/', getAllCategories);

module.exports = router;
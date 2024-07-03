const router = require('express').Router();
const {getAllNews} = require('../controllers/news/news.controller');

router.get('/', getAllNews);

module.exports = router;
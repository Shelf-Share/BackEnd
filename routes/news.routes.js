const router = require('express').Router();
const {getAllNews, getNewsDetails} = require('../controllers/news/news.controller');

router.get('/', getAllNews);
router.get('/:id', getNewsDetails);

module.exports = router;
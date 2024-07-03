const router = require('express').Router();
const {getAllNews, getNewsDetails, addNews, updateNews, deleteNews} = require('../controllers/news/news.controller');
const {image} = require('../libs/multer');

router.get('/', getAllNews);
router.get('/:id', getNewsDetails);
router.post('/', image.single('image'), addNews);
router.put('/:id', image.single('image'), updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
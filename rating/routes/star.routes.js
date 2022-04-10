const starController = require('../controllers/star.controller');

const router = require('express').Router(); 

router.post('/', starController.donnerStar); 

module.exports = router;
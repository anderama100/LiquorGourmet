const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/spirits/edit/:id', reviewsCtrl.create);


module.exports = router;
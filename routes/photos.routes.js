const express = require('express');
const router = express.Router();

const photos = require('../controllers/photos.controller');
const voters = require('../controllers/voters.controller');

router.get('/photos', photos.loadAll);
router.post('/photos', photos.add);
router.put('/photos/vote/:id', voters.vote);

module.exports = router;

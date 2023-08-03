const express = require('express');
const { translateText } = require('../Controllers/translateText')

const router = express.Router();


router.post('/translate', translateText)


module.exports = router;
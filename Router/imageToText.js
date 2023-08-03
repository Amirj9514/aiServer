const express = require('express');
const { imageToText } = require('../Controllers/imageToText')

const router = express.Router();


router.post('/ocr', imageToText)


module.exports = router;
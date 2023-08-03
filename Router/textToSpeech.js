const express = require('express');
const { textToSpeechController } = require('../Controllers/textToSpeach')

const router = express.Router();


router.post('/textToSpeach', textToSpeechController)


module.exports = router;
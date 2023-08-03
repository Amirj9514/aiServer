const express = require('express');
const { WriteLetterController } = require('../Controllers/writeLetter')

const router = express.Router();


router.post('/genrateLetter', WriteLetterController)


module.exports = router;
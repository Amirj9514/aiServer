const express = require('express');
const { SendEmail } = require('../Controllers/sendEmail')

const router = express.Router();


router.post('/sendMail', SendEmail)


module.exports = router;
const express = require('express');
const { chatbotController } = require('../Controllers/chatbot')

const router = express.Router();


router.post('/chat', chatbotController)


module.exports = router;
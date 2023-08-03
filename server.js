const express = require('express')
const cors = require('cors');
const path = require('path')
const fileUpload = require("express-fileupload");

const imageToText = require('./Router/imageToText')
const translateText = require('./Router/translateText')
const chatBot = require('./Router/chatbot');
const textToSpeech = require('./Router/textToSpeech');
const letterGenrator = require('./Router/letterGenrator');
const sendMail = require('./Router/sendEmail');






const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 1024 * 1024 // 1 MB
        },
        // abortOnLimit: true
    })
);


//  Router


app.use('', imageToText);
app.use('', translateText);
app.use('', chatBot)
app.use('', textToSpeech)
app.use('', letterGenrator)
app.use('', sendMail)







app.listen(8001, () => {
    console.log("Server Runing On Port 8001");
});

const respReturn = require('../Shared/response');
const synthesizeText = require('../Shared/textToSpeech');
const path = require('path')
const fs = require("fs");


exports.textToSpeechController = (req, res) => {
    const { text, langCode } = req.body;
    if (text && langCode) {
        const randomName = Math.random().toString(36).substring(7);
        const outputFile = randomName + '.mp3';

        synthesizeText(text, outputFile, langCode)
            .then((resp) => {
                if (resp.status) {
                    const audioPath = path.join(__dirname, '../public', 'audio', outputFile);
                    res.sendFile(audioPath)
                    setTimeout(() => {
                        fs.unlinkSync(audioPath);
                    }, 60000);
                } else {
                    res.status(404).json(respReturn(false, false, "Error During Convert text into speech"))
                }
            })
            .catch((err) => {
                res.json(respReturn(false, false, "Error During Convert text into speech"))
            });
    } else {
        res.json(respReturn(false, false, "Text and langCode feild is required"))
    }


}
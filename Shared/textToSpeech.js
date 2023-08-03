const fs = require("fs");
const util = require("util");
const path = require('path')
const textToSpeech = require('@google-cloud/text-to-speech');


const synthesizeText = async (text, outputFile, code) => {
    const keyFile = path.join(__dirname, '../Environment/key.json');
    const client = new textToSpeech.TextToSpeechClient({ projectId: "mabroor-project", keyFilename: keyFile, });

    try {
        const request = {
            input: { text },
            voice: { languageCode: code, ssmlGender: "NEUTRAL" },
            audioConfig: { audioEncoding: "MP3" },
        };

        const [response] = await client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        const audioPath = path.join(__dirname, `../public/audio/${outputFile}`);
        await writeFile(audioPath, response.audioContent, "binary");
        return { status: true, path: audioPath }
    } catch (err) {
        console.log(err);
        return { status: false, path: null }
    }

}


module.exports = synthesizeText;


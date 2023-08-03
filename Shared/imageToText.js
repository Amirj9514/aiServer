const path = require('path');
const vision = require('@google-cloud/vision');

const fs = require('fs')


const convertImageToText = async (imagePath) => {
    const keyFile = path.join(__dirname, '../Environment/key.json');
    const client = new vision.ImageAnnotatorClient({ keyFilename: keyFile, });



    try {
        const [result] = await client.textDetection(imagePath);
        const textAnnotations = result.textAnnotations;

        fs.unlinkSync(imagePath);

        if (textAnnotations && textAnnotations.length > 0) {

            // If there is text in the image, return the extracted text
            return { error: false, text: textAnnotations[0].description, message: null };
        } else {
            // If no text is found, return an appropriate message or handle as needed

            return { error: true, text: textAnnotations[0].description, message: "No text found in the image." }
        }
    } catch (err) {

        throw err;
    }
}


module.exports = convertImageToText



ImageConvert.visionApi = async (data, result) => {
    const client = new vision.ImageAnnotatorClient({ keyFilename: "./key.json", });


    try {
        const [imageResult] = await client.textDetection(imagePath);
        const textAnnotations = imageResult.textAnnotations;

        if (textAnnotations && textAnnotations.length > 0) {
            // If there is text in the image, return the extracted text


            result(null, textAnnotations[0].description);
        } else {
            // If no text is found, return an appropriate message or handle as needed
            result("No text found in the image.", null);
        }
    } catch (err) {
        result("Error converting image to text", null);

    }
}


module.exports = ImageConvert
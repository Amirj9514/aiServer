const pdf = require('pdf-parse');
const fs = require("fs");

const pdfToText = async (pdfFilePath) => {

    let dataBuffer = fs.readFileSync(pdfFilePath);
    let convertData = '';

  

    const data = pdf(dataBuffer)
    console.log(data.text);
    // return data.text


}


module.exports = pdfToText
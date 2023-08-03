
const path = require('path');
const pdf = require('pdf-parse');
const fs = require("fs");


const imageChecker = require('../Shared/imageValidator');
const respReturn = require('../Shared/response')
const chatbot = require('../Shared/chatBot');
const convertImageToText = require('../Shared/imageToText')




exports.translateText = (req, res) => {
    const { fileLangName, sumLangName, fileLangCode, sumLangCode } = req.body;

    let fileLang = {
        name: fileLangName,
        code: fileLangCode
    }

    let sumLang = {
        name: sumLangName,
        code: sumLangCode
    }
    const { image } = req.files
    const baseFolder = "public";
    const subFolder = "TranslateImageToText";

    if (fileLang.code && sumLang.code && image) {
        const validImage = imageChecker(image)
        if (validImage.status) {
            const randomName = Math.random().toString(36).substring(7);
            const fileName =
                randomName + "." + image.name.split(".").pop();
            const filePath = path
                .join(baseFolder, subFolder, fileName)
                .replace(/\\/g, "/");


            image.mv(filePath, (err) => {
                if (!err) {
                    if (validImage.type === 'pdf') {
                        let dataBuffer = fs.readFileSync(filePath);
                        pdf(dataBuffer).then(function (data) {

                            if (fileLang.code === sumLang.code) {
                                res.json(respReturn(true, false, "success", data.text))
                            } else {
                                let input = `convert this Text from ${fileLang.name}(${fileLang.code}) to ${sumLang.name}(${sumLang.code}) "${data.text}"`
                                chatbot(input).then((replay) => {
                                    res.json(respReturn(true, false, 'success', replay.content))
                                }).catch((err) => {
                                    res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                })
                            }
                        });
                    } else {
                        convertImageToText(filePath).then((resp) => {
                            if (!resp.error) {
                                if (fileLang.code === sumLang.code) {
                                    res.json(respReturn(true, false, "success", resp.text))
                                } else {
                                    let input = `convert this Text from ${fileLang.name}(${fileLang.code}) to ${sumLang.name}(${sumLang.code}) "${resp.text}"`
                                    // let input = `Summarize this text to 1/3 "" ${resp.text}`
                                    chatbot(input).then((replay) => {
                                        res.json(respReturn(true, false, 'success', replay.content))
                                    }).catch((err) => {
                                        res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                    })
                                }
                            }
                            else {
                                res.json(respReturn(false, false, resp.message))
                            }
                        })
                            .catch(err => {
                                res.send(err)
                            });
                    }
                } else {
                    res.json(respReturn(false, false, "Server Error During Upload a image"))
                }
            });

        } else {
            res.json(respReturn(false, false, "Invalid Image Type !"))

        }

    } else {
        res.json(respReturn(false, false, "Some Required Feild is missing"))
    }




}




const path = require('path');
const pdf = require('pdf-parse');
const fs = require("fs");


const imageChecker = require('../Shared/imageValidator');
const respReturn = require('../Shared/response')
const chatbot = require('../Shared/chatBot');
const convertImageToText = require('../Shared/imageToText')




exports.imageToText = (req, res) => {
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
    console.log(fileLang, sumLang);
    const baseFolder = "public";
    const subFolder = "imgToText";

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

                                let input = `"Please provide a concise summary of the following text in one-third of its original length : ${resp.text} in ${sumLang.name}(${sumLang.code})`;
                                chatbot(input).then((replay) => {
                                    res.json(respReturn(true, false, '', replay.content))
                                }).catch((err) => {
                                    res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                })
                            } else {
                                let input = `convert this Text from ${fileLang.name}(${fileLang.code}) to ${sumLang.name}(${sumLang.code}) "${resp.text}"`
                                chatbot(input).then((replay) => {
                                    let input2 = `"Summary in ${sumLang.name} (${sumLang.code})  in one-third of its original length : - ${replay.content}"`
                                    chatbot(input2).then((replay) => {
                                        res.json(respReturn(true, false, '', replay.content))
                                    }).catch((err) => {
                                        res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                    })
                                }).catch((err) => {
                                    res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                })
                            }
                        });
                    } else {
                        convertImageToText(filePath).then((resp) => {
                            if (!resp.error) {
                                if (fileLang.code === sumLang.code) {

                                    let input = `"Please provide a concise summary of the following text in one-third of its original length : ${resp.text} in ${sumLang.name}(${sumLang.code})`;
                                    chatbot(input).then((replay) => {
                                        res.json(respReturn(true, false, '', replay.content))
                                    }).catch((err) => {
                                        res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                    })
                                } else {
                                    let input = `convert this Text from ${fileLang.name}(${fileLang.code}) to ${sumLang.name}(${sumLang.code}) "${resp.text}"`
                                    chatbot(input).then((replay) => {
                                        let input2 = `"Summary in ${sumLang.name} (${sumLang.code})  in one-third of its original length : - ${replay.content}"`
                                        chatbot(input2).then((replay) => {
                                            res.json(respReturn(true, false, '', replay.content))
                                        }).catch((err) => {
                                            res.json(respReturn(false, false, 'Something Went Wrong reload Page ',))
                                        })
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



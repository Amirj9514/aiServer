
const returnResp = require('../Shared/response')
const chatbot = require('../Shared/chatBot');

exports.WriteLetterController = (req, res) => {
    const { type, lang, desc } = req.body;
    console.log(type, lang, desc);
    if (type && lang && desc) {

        let input = `Write a ${type} in ${lang.name}(${lang.code}) Language ,  using this description :${desc}`
        chatbot(input).then((reply) => {
            res.json(returnResp(true, false, 'success', reply.content))
        }).catch((err) => {
            res.json(returnResp(false, false, "Something Went Wrong"))
        })
    } else {
        res.json(returnResp(false, false, "type , lang , desc Feild is required"))
    }
}
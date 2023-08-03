
const respReturn = require('../Shared/response')
const chatbot = require('../Shared/chatBot');


exports.chatbotController = (req, res) => {
    const { input } = req.body;

    if (input) {
        console.log(input);
        chatbot(input).then((reply) => {
            res.json(respReturn(true, false, 'success', reply.content))
        })
            .catch((err) => {
                res.json(respReturn(false, false, "Something Went Wrong"))
            })
    } else {
        res.json(respReturn(false, false, "Please Write something first !"))
    }
}
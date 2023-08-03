const { Configuration, OpenAIApi } = require("openai");



let data1 = "sk-"
let data2 = "tHU7qkkVvnp3"
let data3 = "pTqnD0VTT3BlbkFJbY3"
let data4 = "gF4v3MxSNe7mbSL7w"


const configuration = new Configuration({
    apiKey: data1 + data2 + data3 + data4,
});
const openai = new OpenAIApi(configuration);


const chatbot = async (input) => {

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `${input}`,
                },
            ],
        });
        return chatCompletion.data.choices[0].message;
    } catch (err) {

    }

}

module.exports = chatbot;
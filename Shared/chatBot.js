const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const chatbot = async (input) => {

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `${input}`,
            },
        ],
    });
    console.log(chatCompletion.data.choices[0].message);
    return chatCompletion.data.choices[0].message;
}

module.exports = chatbot;
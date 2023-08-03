const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
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
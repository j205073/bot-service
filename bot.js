const { ActivityHandler } = require('botbuilder');
const axios = require('axios');

class TeamsBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
            const response = await this.getAzureOpenAIResponse(userMessage);
            await context.sendActivity(response);
            await next();
        });
    }

    async getAzureOpenAIResponse(message) {
        try {
            const response = await axios.post(process.env.AZURE_OPENAI_ENDPOINT, {
                prompt: message,
                max_tokens: 150,
                model: process.env.AZURE_OPENAI_MODEL
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.AZURE_OPENAI_KEY
                }
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling Azure OpenAI API:', error);
            return "抱歉，我遇到了一些问题，无法回答您的问题。";
        }
    }
}

module.exports.TeamsBot = TeamsBot;
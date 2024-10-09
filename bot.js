const { ActivityHandler, MessageFactory } = require('botbuilder');
const axios = require('axios');

class TeamsBot extends ActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
        console.log('Received message:', context.activity.text);
        try {
            const aiResponse = await this.getAzureOpenAIResponse(context.activity.text);
            await context.sendActivity(aiResponse);
        } catch (error) {
            console.error('Error processing message:', error);
            await context.sendActivity("抱歉，處理您的訊息時出現了問題。");
        }
        await next();
    });
  }

  

async getAzureOpenAIResponse(message) {
    try {
        const response = await axios.post(
            `https://rinnaiopenaitest.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-03-15-preview`, // 更新 API 版本
            {
                "messages": [
                  {
                    "role": "system",
                    "content": [
                      {
                        "type": "text",
                        "text": "您是協助人員尋找資訊的 AI 助理。"
                      }
                    ]
                  },
                  {
                    "role": "user",
                    "content": [
                      {
                        "type": "text",
                        "text": message
                      }
                    ]
                  },
                  {
                    "role": "assistant",
                    "content": [
                      {
                        "type": "text",
                        "text": "Hello! How can I assist you today?"
                      }
                    ]
                  }
                ],
                "temperature": 0.7,
                "top_p": 0.95,
                "max_tokens": 800
              },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.AZURE_OPENAI_KEY
                }
            }
        );
        console.log('這是回傳訊息:', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Azure OpenAI API:', error.response ? error.response.data : error.message);
        return "抱歉，我遇到了一些問題，無法回答您的問題。";
    }
}


}

module.exports.TeamsBot = TeamsBot;
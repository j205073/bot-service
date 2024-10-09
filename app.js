const express = require('express');
const { CloudAdapter, BotFrameworkAdapter,ConfigurationBotFrameworkAuthentication } = require('botbuilder');
const { TeamsBot } = require('./bot');
require('dotenv').config();


const app = express();
// 添加這行來解析 JSON 請求體
app.use(express.json());


const port = process.env.PORT || 3978;


// let adapter;
// if (process.env.NODE_ENV === 'production') {
// //   console.log('Using production configuration');
// //   const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(process.env);
// //   adapter = new CloudAdapter(botFrameworkAuthentication);
// adapter = new BotFrameworkAdapter({});
// } else {
//   console.log('Using development configuration');
//   adapter = new BotFrameworkAdapter({});
// }

// // 添加錯誤處理
// adapter.onTurnError = async (context, error) => {
//   console.error(`\n [onTurnError] unhandled error: ${error}`);
//   await context.sendTraceActivity(
//     'OnTurnError Trace',
//     `${error}`,
//     'https://www.botframework.com/schemas/error',
//     'TurnError'
//   );
//   await context.sendActivity('The bot encountered an error or bug.');
// };

// const bot = new TeamsBot();

// app.post('/api/messages', async (req, res) => {
//   console.log('Received request:', JSON.stringify(req.body, null, 2));
//   try {
//     await adapter.process(req, res, async (context) => {
//       console.log('Processing activity:', context.activity.type);
//       await bot.run(context);
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.get('/ping', (req, res) => {
  res.status(200).send({
env:process.env.NODE_ENV,
AZURE_OPENAI_ENDPOINT:process.env.AZURE_OPENAI_ENDPOINT,
AZURE_OPENAI_MODEL:process.env.AZURE_OPENAI_MODEL,
AZURE_OPENAI_KEY:process.env.AZURE_OPENAI_KEY,
MicrosoftAppId:process.env.MicrosoftAppId,
MicrosoftAppPassword:process.env.MicrosoftAppPassword,
AZURE_OPENAI_DEPLOYMENT_ID:process.env.AZURE_OPENAI_DEPLOYMENT_ID,
MicrosoftAppType:process.env.MicrosoftAppType,
MicrosoftAppTenantId:process.env.MicrosoftAppTenantId

  });
});

app.listen(port, () => {
  console.log(`Bot is running on port ${port}`);
});
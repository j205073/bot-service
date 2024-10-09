const express = require('express');
const { BotFrameworkAdapter } = require('botbuilder');
const { TeamsBot } = require('./bot');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3978;

const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const bot = new TeamsBot();

app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

app.get('/ping', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Bot is running on port ${port}`);
});
import * as TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TG_BOT_TOKEN ?? '', { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    console.log('received', msg);

    bot.sendMessage(chatId, `${process.env.NODE_ENV === 'production' ? 'Remote' : 'Local'} said: ${messageText}`);
});

bot.startPolling()
    .then((e) => {
        console.log('then', e);
    })
    .catch((e) => {
        console.warn('catch', e);
    });

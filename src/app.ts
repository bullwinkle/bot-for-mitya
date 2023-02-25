import {Context, Markup, Telegraf, Telegram} from 'telegraf';
import {Update} from 'typegram';
import {Configuration as OpenAIConfiguration, OpenAIApi} from "openai";

const openAIConfiguration = new OpenAIConfiguration({
    apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(openAIConfiguration);

const token: string = process.env.BOT_TOKEN as string;

const telegram: Telegram = new Telegram(token);

const bot: Telegraf<Context<Update>> = new Telegraf(token);

const chatId: string = process.env.CHAT_ID as string;

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);

    // Context shortcut
    ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
    ctx.reply(
        'Keyboard',
        Markup.inlineKeyboard([
            Markup.button.callback('First option', 'first'),
            Markup.button.callback('Second option', 'second'),
            Markup.button.callback('Third option', 'third'),
        ])
    );
});

bot.on('text', async (ctx) => {
    console.log(ctx)
    // ctx.reply(
    //     'You choose the ' +
    //     (ctx.message.text === 'first' ? 'First' : 'Second') +
    //     ' Option!'
    // );
    //
    // if (chatId) {
    //     await telegram.sendMessage(
    //         chatId,
    //         'This message was sent without your interaction!'
    //     );
    // }

    await openai.createImage({
        prompt: ctx.message.text, //user entered input text will store here.
        n: 1, //number of images that are we expecting from OpenAI API.
        size: '1024x1024' //size of image that are we expecting from OpenAI API.
    }).then(x => {
        console.log('x: ', x.data);

        ctx.replyWithPhoto({ source: String(x.data.data[0].url) }, { caption: "cat photo" });
    }).catch(y => {
        console.log('y: ', y);
        ctx.reply(String('Request error'));
    });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

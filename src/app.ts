import {Context, Telegraf, Telegram} from 'telegraf';
import {Update} from 'typegram';
import {Configuration as OpenAIConfiguration, OpenAIApi} from "openai";

const IS_PRODUCTION = process.env.NODE_ENV == 'production';
const CHAT_ID = Number(process.env.CHAT_ID || 0);
const OPEN_AI_API_KEY = process.env.OPENAI_TOKEN as string;
const BOT_TOKEN = process.env.BOT_TOKEN as string;

const openAIConfiguration = new OpenAIConfiguration({
    apiKey: OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(openAIConfiguration);

const telegram: Telegram = new Telegram(BOT_TOKEN);

const bot: Telegraf<Context<Update>> = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

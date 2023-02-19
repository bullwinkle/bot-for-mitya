"use strict";
var _a;
exports.__esModule = true;
var TelegramBot = require("node-telegram-bot-api");
var bot = new TelegramBot((_a = process.env.TG_BOT_TOKEN) !== null && _a !== void 0 ? _a : '', { polling: true });
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var messageText = msg.text;
    bot.sendMessage(chatId, "".concat(process.env.NODE_ENV === 'production' ? 'Remote' : 'Local', " said: ").concat(messageText));
});

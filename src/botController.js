import Telegraf from 'telegraf';

import {deadKey} from "./deadKey";
import {log} from "./usefulFunctions";
import {getFolder} from "./YDiskFunctions";
import {BotKey, YLogin, YPassword} from "./settingPortaol";

const messageLog = ctx => {
    const o = ctx.update.message;
    log(`${o.from.first_name} (${o.from.username}@${o.from.id}): ${o.text}`, 'm');
};

export function startBot(botKey) {
    const bot = new Telegraf(botKey);

    bot.start(ctx => {
        ctx.reply('hi');
    });

    bot.on('message', ctx => {
        messageLog(ctx);

        let text = ctx.update.message.text;

        if (ctx.update.message.from.is_bot) return 0;

        if (ctx.update.message.from.username == 'Zekoner') {
            ctx.reply('Жека хуй соси');
            // throw new Error("Something went badly wrong!");
        }

        if (ctx.update.message.from.id == 370382739) {
            if (text.indexOf('stats') == 0) {
                ctx.reply(`some stats: ${YLogin}, ${YPassword}, ${BotKey}.`);
                return 0;
            }
            if (text == deadKey) {
                ctx.reply('shutdown');
                throw new Error("ERROR in Entry module not found: Error: Can't resolve 'babel-loader'");
            }
        }

        ctx.reply('Searching...');

        getFolder(text)
            .then(
                res => ctx.reply(res),
                err => {
                    ctx.reply('Maybe there is no such folder :(');
                    log(err, 'e');
                }
            );
    });

    bot.startPolling();

    log('bot started');
}


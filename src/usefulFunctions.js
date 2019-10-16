const YandexDisk = require('yandex-disk').YandexDisk;
import Telegraf from 'telegraf';
import {pageCode} from "./settingPage";

export function log(text, mode=false) {
    if (mode == 'd') {
        console.log(`[deb] ${text}`);
        return 0;
    }
    if (mode == 'e') {
        console.log(`[ERR] ${text}`);
        return 0;
    }
    if (mode == 'm') {
        console.log(`[msg] ${text}`);
        return 0;
    }
    if (!mode){
        console.log(`[log] ${text}`);
        return 0;
    }
}

export function checkYDiskLogPas(login, pas) {
    log('starting check YDisk');
    const disk = new YandexDisk(login, pas);
    return new Promise((resolve, rej) => {
        disk.readdir('/', (err, res) => {
            if (err) rej(err);
            resolve(res);
        });
    });
}

export function checkTeleKey(key) {
    log('starting check TeleKey');
    let bot = new Telegraf(key);
    return new Promise((res, rej) => {
        bot.launch()
            .then(
                re => {
                    bot.stop();
                    res(re);
                },
                er => rej(er)
            )
    });
}

export function renderSettPage() {
    // let pageCode = '';
    const scriptCode = '';
    return pageCode;
}
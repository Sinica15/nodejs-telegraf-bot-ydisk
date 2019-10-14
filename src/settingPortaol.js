import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs'

import {checkTeleKey, checkYDiskLogPas, log, renderSettPage} from './usefulFunctions';
import {startBot} from "./botController";

const YandexDisk = require('yandex-disk').YandexDisk;

const PORT = process.env.PORT || 2280;

export let
    YLogin      = '',
    YPassword   = '',
    BotKey      = '',
    disk;

export function startSettPortal() {
    const app = express();

    app.use(bodyParser.json()); // parse application/json

    app.use('/', (req, res, next) => {
        // cond(JSON.stringify(req.json));
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
        next();
    });

    app.get('/', (req, res) => {
        log(req);
        res.send(renderSettPage());
    });

    app.post('/', (req, res) => {
        console.log(req.body);
        let reqObj = req.body;
        let resObj = {};

        checkYDiskLogPas(reqObj['y-login'], reqObj['y-password'])
            .then(
                () => {
                    YLogin = reqObj['y-login'];
                    YPassword = reqObj['y-password'];
                    resObj.YDiskOk = true;
                },
                () => resObj.YDiskOk = false
            )
            .then(() => {
                checkTeleKey(reqObj['bot_token'])
                    .then(
                        () => {
                            BotKey = reqObj['bot_token'];
                            resObj.TelegOk = true;
                        },
                        () => resObj.TelegOk = false
                    )
                    .then(() => {
                        res.send(JSON.stringify(resObj));
                        if (resObj.YDiskOk && resObj.TelegOk) {
                            fs.writeFileSync("data.json", JSON.stringify({YLogin, YPassword, BotKey}));
                            disk = new YandexDisk(YLogin, YPassword); // доступ по логину и паролю
                            startBot(reqObj['bot_token'])
                        }
                    });
            })


    });

    if (fs.existsSync('./data.json')) {
        let dataObj = JSON.parse(fs.readFileSync("data.json", "utf8"));
        YLogin = dataObj.YLogin;
        YPassword = dataObj.YPassword;
        BotKey = dataObj.BotKey;
        disk = new YandexDisk(YLogin, YPassword); // доступ по логину и паролю
        startBot(BotKey);
    }

    app.listen(PORT, function () {
        log('web started on ' + PORT);
    });

    log('portal started')
}

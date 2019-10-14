const YandexDisk = require('yandex-disk').YandexDisk;
import Telegraf from 'telegraf';

export const log = (text, mode=false) => {
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
};

export function checkYDiskLogPas(log, pas) {
    const disk = new YandexDisk(log, pas);
    return new Promise((resolve, rej) => {
        disk.readdir('/', (err, res) => {
            if (err) rej(err);
            resolve(res);
        });
    });
}

export function checkTeleKey(key) {
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
    let pageCode = '';
    const scriptCode = '';
    pageCode +=
        '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Setting page</title>\n' +
        '    <style>\n' +
        '        body{\n' +
        '            height: 100%;\n' +
        '            margin: 0;\n' +
        '            padding: 0;\n' +
        '        }\n' +
        '        #setting-app{\n' +
        '            background-color: #d5e7ff;\n' +
        '            height: 100vh;\n' +
        '            display: flex;\n' +
        '            flex-direction: row;\n' +
        '            justify-content: center;\n' +
        '        }\n' +
        '        #setting-app > form{\n' +
        '            position: relative;\n' +
        '            margin: auto;\n' +
        '            display: flex;\n' +
        '            flex-direction: column;\n' +
        '            width: 330px;\n' +
        '        }\n' +
        '        #setting-app > form:after{\n' +
        '            content: \'\';\n' +
        '            position: absolute;\n' +
        '            width: 80px;\n' +
        '            height: 80px;\n' +
        '            top: -100px;\n' +
        '            right: 82px;\n' +
        '            background-size: contain;\n' +
        '            background-image: url(https://lh3.googleusercontent.com/Q9iL0ds-68WVPlf--dbhPmBkDTFAkW-FfV_m3GdQetrj8Oo_uCXRhbgNipOoTlmNwGI=s180-rw);\n' +
        '        }\n' +
        '        #setting-app > form:before{\n' +
        '            content: \'\';\n' +
        '            position: absolute;\n' +
        '            width: 73px;\n' +
        '            height: 73px;\n' +
        '            top: -100px;\n' +
        '            left: 65px;\n' +
        '            background-size: contain;\n' +
        '            background-image: url(https://upload.wikimedia.org/wikipedia/commons/5/5c/Telegram_Messenger.png);\n' +
        '        }\n' +
        '        #setting-app > form button{\n' +
        '            width: 300px;\n' +
        '            margin: 5px;\n' +
        '            padding: 2px;\n' +
        '        }\n' +
        '        #setting-app form > div{\n' +
        '            width: 300px;\n' +
        '            display: flex;\n' +
        '            justify-content: space-between;\n' +
        '            margin: 5px;\n' +
        '        }\n' +
        '        #setting-app form > div input{\n' +
        '            padding: 1px;\n' +
        '        }\n' +
        '\n' +
        '        #loading {\n' +
        '            display:    none;\n' +
        '            position:   fixed;\n' +
        '            z-index:    1000;\n' +
        '            top:        0;\n' +
        '            left:       0;\n' +
        '            height:     100%;\n' +
        '            width:      100%;\n' +
        '            background: rgba( 255, 255, 255, .8 )\n' +
        '            url(\'http://i.stack.imgur.com/FhHRx.gif\')\n' +
        '            50% 50%\n' +
        '            no-repeat;\n' +
        '        }\n' +
        '    </style>\n' +
        '</head>\n' +
        '<body>\n' +
        '    <div id="setting-app">\n' +
        '        <div id="loading"><!-- Place at bottom of page --></div>\n' +
        '        <form>\n' +
        '            <div>\n' +
        '                <label for="t-key">Bot token</label>\n' +
        '                <input type="text" name="" id="t-key">\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                <label for="y-log">YDrive login</label>\n' +
        '                <input type="text" name="" id="y-log">\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                <label for="y-pas">YDrive password</label>\n' +
        '                <input type="password" name="" id="y-pas">\n' +
        '            </div>\n' +
        '            <button id="enter-btn">Enter params and start</button>\n' +
        '        </form>\n' +
        '    </div>\n' +
        '    <script>\n' +
        '        const id = id => document.getElementById(id);\n' +
        '\n' +
        '        let btn = id(\'enter-btn\');\n' +
        '\n' +
        '        btn.addEventListener(\'click\', e => {\n' +
        '            e.preventDefault();\n' +
        '\n' +
        '            id(\'loading\').style.display = \'block\';\n' +
        '\n' +
        '            fetch("http://" + location.host, {\n' +
        '            //fetch(\'http://localhost:2280/\', {\n' +
        '                method: \'POST\', // *GET, POST, PUT, DELETE, etc.\n' +
        '                mode: \'cors\', // no-cors, cors, *same-origin\n' +
        '                cache: \'no-cache\', // *default, no-cache, reload, force-cache, only-if-cached\n' +
        '                credentials: \'same-origin\', // include, *same-origin, omit\n' +
        '                headers: {\n' +
        '                    \'Access-Control-Allow-Origin\' : \'*\',\n' +
        '                    \'Accept\': \'application/json\',\n' +
        '                    \'Content-Type\': \'application/json\',\n' +
        '                },\n' +
        '                redirect: \'follow\', // manual, *follow, error\n' +
        '                referrer: \'no-referrer\', // no-referrer, *client\n' +
        '                body: JSON.stringify({\n' +
        '                    \'bot_token\' : id(\'t-key\').value,\n' +
        '                    \'y-login\' : id(\'y-log\').value,\n' +
        '                    \'y-password\' : id(\'y-pas\').value\n' +
        '                }), // тип данных в body должен соответвовать значению заголовка "Content-Type"\n' +
        '            })\n' +
        '                .then(res => res.text())\n' +
        '                .then(res => {\n' +
        '                    id(\'loading\').style.display = \'none\';\n' +
        '\n' +
        '                    let resP = JSON.parse(res);\n' +
        '                    if (resP.TelegOk) {\n' +
        '                        id(\'t-key\').style.backgroundColor = \'lightgreen\';\n' +
        '                    } else {\n' +
        '                        id(\'t-key\').style.backgroundColor = \'lightcoral\';\n' +
        '                    }\n' +
        '                    if (resP.YDiskOk) {\n' +
        '                        id(\'y-log\').style.backgroundColor = \'lightgreen\';\n' +
        '                        id(\'y-pas\').style.backgroundColor = \'lightgreen\';\n' +
        '                    } else {\n' +
        '                        id(\'y-log\').style.backgroundColor = \'lightcoral\';\n' +
        '                        id(\'y-pas\').style.backgroundColor = \'lightcoral\';\n' +
        '                    }\n' +
        '                });\n' +
        '        })\n' +
        '\n' +
        '    </script>\n' +
        '</body>\n' +
        '</html>';

    return pageCode;
}
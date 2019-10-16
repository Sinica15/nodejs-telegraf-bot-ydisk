import {YLogin, YPassword} from "./settingPortaol";

// const YandexDisk = require('yandex-disk').YandexDisk;
// const disk = new YandexDisk(YLogin, YPassword); // доступ по логину и паролю

import {disk} from "./settingPortaol";
import {log} from "./usefulFunctions";
let searchFolder = '/';

export function getFolder(folderName) {
    return new Promise((resolve, reject) => {
        readFoldersList()
            .then(
                res => {
                    let folders = [];
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].isDir && res[i].displayName.toLowerCase().indexOf(folderName.toLowerCase()) >= 0)
                            folders.push(res[i].displayName);
                    }

                    log(`Folders list: ${folders}`, 'd');

                    if (folders.length > 1) {
                        let resp = 'There are several folders according to your request: ';
                        folders.forEach( (fl, i) => {
                            if (i != folders.length - 1){
                                resp += `${fl}, `
                            } else {
                                resp += `${fl}.\n`
                            }
                        });
                        return resp + 'Specify request.';
                    } else {
                        return createFolderLink(folders[0]);
                    }
                },
                err => reject(err)
            )
            .then(
                res => resolve(res),
                err => reject(`Get folder problem: ${err}`)
            )
            .catch(err => reject(err));
    });
}

// console.log('kjhkjh');

function readFoldersList () {
    return new Promise((resolve, rej) => {
        disk.readdir(searchFolder, (err, res) => {
            if (err) rej(err);
            resolve(res);
        });
    });
}

function createFolderLink (folderName) {
    return new Promise( (resolve, rej) => {
        disk.publish(searchFolder + '/' + folderName + '/', (err, res) => {
            if (err) rej(err);
            resolve(res);
        });
    });
}
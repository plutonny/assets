/*       -------        Debug file        -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var debugBuild = 21;
var BETA = true;

var CURRDATE = new Date();
var LOG = [];

var betaFolder = '';
if (BETA) {
    betaFolder += 'beta/'; 
    output('csc11-title-of-page', 'Beta version');
};

/* Storage SVG icons */

var SVG = {
    theme_button    :`<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thMoon">
                        <rect fill="none" height="20" width="20"/>
                        <path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thSun">
                        <rect fill="none" height="20" width="20"/>
                        <path d="M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z"/>
                      </svg>`,
    back_button     :`<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                      </svg>`,
    settings_button :`<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                      </svg>`,
    
    home_icon       :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                      </svg>`,
    calendar_icon   :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
                      </svg>`,
    done_icon       :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M18 9l-1.41-1.42L10 14.17l-2.59-2.58L6 13l4 4zm1-6h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/>
                      </svg>`,
    other_icon      :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                      </svg>`
}

/**
 *  Output text on page by id element
 * 
 *      "id"   - HTML element id (need to create one)
 *      "data" - text (HTML, what else)
 * 
 */
function output(id, data) { try { document.getElementById(id).innerHTML = data; return true } catch (e) { logs('critical', `Error: output function (maybe couldn't find tag id ${id}): (${e})`); return false } }

/**
 *  Outputted modal (div id "modal" need)
 * 
 *      "type" - mini (small text on top of the page) or max (modal on fullscreen)
 * 
 */
 async function modal(type, content) {
    try {
        await sleep(200)
        if (type == 'mini') { 
            document.getElementById('modal').innerHTML += `
                <div class="mini-modal">
                    <style>
                        div.modal { position: fixed; height: 72px; width: 100%; z-index: 99; }
                        div.mini-modal { display: flex; align-items: center; height: 36px; z-index: 100; margin: 8px; padding-left: 12px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 100px; }
                    </style>
                    ${content}
                </div>
            `; 
            await sleep(2000);
            output('modal', '') 
        }
        else if (type == 'max')  { 
            if (deviceStorage('get','theme') == 'dark') { document.getElementById('theme-color').content = '#2a2a2a' } 
            if (deviceStorage('get','theme') == 'light') { document.getElementById('theme-color').content = '#9b9b9b' } 
            output('modal', `
                <div class="max-modal">
                    <style>
                        div.modal { position: fixed; height: 100%; width: 100%; background-color :#40404075; z-index: 99; }
                        div.max-modal { height: 100%; display: flex; justify-content: center; align-items: center; z-index: 100; }
                    </style>
                    ${content}
                </div>
            `) 
        }
        return true
    } catch (e) {
        logs('error', `Error: modal function (${e})`)
        return false
    }
}

/**
 *  Await function
 * 
 *      "ms" - count of miliseconds to await
 * 
 */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

/**
 *  Work with console log and logging on page
 * 
 *      "type" - (info, warn, error, critical)
 *      "data" - text of log data
 * 
 */
function logs(type, data) {
         if (type == 'info')     { LOG.push([type, data]); console.info(data) }
    else if (type == 'warn')     { LOG.push([type, data]); console.warn(data) }
    else if (type == 'error')    { LOG.push([type, data]); console.error(data); modal('mini', `<p style="margin: 0;">${data}</p>`) }
    else if (type == 'critical') { LOG.push([type, data]); sessionStorage.setItem('errorPageError', data); sessionStorage.setItem('errorPageLog', logInHTML(LOG)); location.assign(`/assets/${betaFolder}error.html`) }
}

/**
 *  Work with localStorage
 * 
 *      "type"            - returned, writing or checking localStorage
 *      "key" and "value" - key and value of localStorage
 * 
 */
function deviceStorage(type, key, value) {
         if (type == 'get')    { return localStorage.getItem(key) }
    else if (type == 'write')  { localStorage.setItem(key, value) }
    else if (type == 'remove') { localStorage.removeItem(key) }
    else if (type == 'check')  { return (deviceStorage('get', key) == null || deviceStorage('get', key) == '') }
    else                       { logs('error', 'Error: localStorage function (type is undefined)') }
}

/**
 *  Returned logs in HTML format
 * 
 *      "data" - log in list formal (variable LOG or in type [[type log, data log], ..., [type log, data log]])
 * 
 */
function logInHTML(data) {
    var result = '', oneOfLog;
    for (var i = 0; i < data.length; i++) { 
        oneOfLog = data[i]
             if (oneOfLog[0] == 'info')     { result += `<p style="box-shadow: 0px 0px 8px var(--navbar-box-color); color: var(--root-text-color); background-color: #0000FF70; border-radius: 12px; padding: 6px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'warn')     { result += `<p style="box-shadow: 0px 0px 8px var(--navbar-box-color); color: var(--root-text-color); background-color: #ffff0070; border-radius: 12px; padding: 6px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'error')    { result += `<p style="box-shadow: 0px 0px 8px var(--navbar-box-color); color: var(--root-text-color); background-color: #ff000070; border-radius: 12px; padding: 6px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'critical') { result += `<p style="box-shadow: 0px 0px 8px var(--navbar-box-color); color: var(--root-text-color); background-color: #00000070; border-radius: 12px; padding: 6px;">${oneOfLog[1]}</p>` } 
    }
    return result
}

/**
 *  Output modal of logs
 */
function modalLog() { modal('max', `
        <div style="max-height: 95%; overflow-y: auto; margin-right: 5%; margin-left: 5%; padding-right: 12px; padding-left: 12px; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
            <h1 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px;">Данные консоли</h1>
            <p style="font-family: 'Montserrat' !important; margin:16px;">${logInHTML(LOG)}</p>
            <div style="display:flex;justify-content:center;">
                <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''; theme('load')">Закрыть</button>
            </div>
        </div>
    `)
}
/**
 *  Output modal to accept clear localStorage
 */
function deleteLocalStorage() { modal('max', `
    <div style="max-height: 95%; overflow-y: auto; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
        <h1 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px;">Очистить</h1>
        <p style="font-family: 'Montserrat' !important; text-align: center;">Ты уверен?</p>
        <div style="display: flex; justify-content: center;">
            <button style="cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 128px; margin: 4px 16px 16px 16px; background-color: #00ff0020;" onclick="document.getElementById('modal').innerHTML = ''; theme('load')">НЕТ</button>
            <button style="cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 128px; margin: 4px 16px 16px 16px; background-color: #ff000020;" onclick="localStorage.clear(); document.getElementById('modal').innerHTML = ''; theme('load')">ДА</button>
        </div>
    </div>
`) 
}

/**
 *  Output modal with additional info in error page
 */
function allInfoErrorModal(selfError, selfLog) {
    var listLocalStrage =  '';
    for (var i = 0; i < localStorage.length; i++) { listLocalStrage += `<p style="font-family: 'Montserrat' !important; background-color: #00000020; border-radius: 12px; padding: 6px; margin: 4px">${localStorage.key(i)} - ${localStorage.getItem(localStorage.key(i))}</p>`  }
    modal('max', `
        <div style="max-height: 95%; overflow-y: auto; margin-right: 5%; margin-left: 5%; padding-right: 12px; padding-left: 12px; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">

        <h2 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px 6px; background-color: #ff000070; border-radius: 12px; padding: 6px;">${selfError}</h2>

        <p style="font-family: 'Montserrat' !important; margin:16px; text-align: center;">Последние логи:</p>
        <p style="font-family: 'Montserrat' !important; margin:16px;">${selfLog}</p>

        <p style="font-family: 'Montserrat' !important; margin:16px; text-align: center;">Ключи localStorage:</p>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">${listLocalStrage}</div>

        <div style="display:flex;justify-content:center;">
            <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''">Закрыть</button>
        </div>
    </div>
`)
}

function debugPage() {
    var inj = '', localStorageKeys = ''
    for (var i = 0; i < localStorage.length; i++) { 
        localStorageKeys += `
        <div style="width: fit-content; margin: 8px; padding: 8px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 16px;">
            <p style="margin: 0; text-align: center;">${localStorage.key(i)} - ${localStorage.getItem(localStorage.key(i))}</p>
            <div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: center;">
                <input style="padding-left: 6px; color: var(--root-text-color); border: none; box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 10px; background-color: #00000055; height: 30px; width: 128px; margin: 4px;" autocomplete="off" type="text" id="lssedit${i}" class="debug_lssedit${i}">
                <script>lssedit${i}.oninput = async function() { deviceStorage("write", "${localStorage.key(i)}", lssedit${i}.value);}</script>
                <button style="width: 64px; margin: 4px; background-color: #ff000055;" onclick="deviceStorage('remove', '${localStorage.key(i)}')">delete</button>
            </div>
        </div>`
    }
    inj += `<div style="background-color: var(--secondary-bg-color); border-top-left-radius: 24px; border-top-right-radius: 24px; padding: 24px 24px 73px 24px; min-height: calc(100vh - 70px);">
                <style>
                    button:not(.back_button) { border-radius: 10px; border: none; box-shadow: 0px 0px 8px var(--navbar-box-color); height: 32px; width: 128px; cursor: pointer; }
                </style>
                <h1 style="text-align: center;">Testing functions:</h1>
                <button style="width: 100%; height: 64px; font-size: 24px; border-radius: 16px; margin-top: 16px;" onclick="modalLog()">Данные консоли</button>
                <button style="width: 100%; height: 64px; font-size: 24px; border-radius: 16px; margin-top: 16px;" onclick="outBetaNotes()">Вывести бета текст</button>
                <button style="width: 100%; height: 64px; font-size: 24px; border-radius: 16px; margin-top: 16px;" onclick="theme('change')">Сменить тему</button>
                <h2 style="text-align: center;">Logs</h2>
                <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly; align-items: center;">
                    <button style="margin: 4px; background-color: #0000ff55;" onclick="logs('info', 'Info: debug.js is calling')">info</button>
                    <button style="margin: 4px; background-color: #ffff0055;" onclick="logs('warn', 'Warning: debug.js is calling')">warn</button>
                    <button style="margin: 4px; background-color: #ff000055;" onclick="logs('error', 'Error: debug.js is calling')">error</button>
                    <button style="margin: 4px; background-color: #00000055;" onclick="logs('critical', 'Critical: debug.js is calling')">critical</button>
                </div>
                <h1 style="text-align: center;">localStorage:</h1>
                <div style="display: flex; flex-direction: row; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center;">
                    ${localStorageKeys}
                </div>
                <button style="margin-top: 32px; width: 100%; height: 64px; font-size: 24px; border-radius: 16px; background-color: #ff000055;" onclick="deleteLocalStorage()">DELETE ALL</button>
            </div>`
    output('debug', inj)
}

deviceStorage('write', 'debugJSBuild', debugBuild);
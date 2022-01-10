/*       -------        Debug file        -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var debugBuild = 20;

var LOG = [];

/**
 *  Output text on page by id element
 * 
 *      "id"   - HTML element id (need to create one)
 *      "data" - text (HTML, what else)
 * 
 */
function output(id, data) { try { document.getElementById(id).innerHTML = data; return true } catch (e) { logs('critical', `Error: output function (${e})`); return false } }

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
            output('modal', `
                <div class="mini-modal">
                    <style>
                        div.modal { position: fixed; height: 72px; width: 100%; z-index: 99; }
                        div.mini-modal { display: flex; align-items: center; height: 36px; z-index: 100; margin: 8px; padding-left: 12px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 100px; }
                    </style>
                    ${content}
                </div>
            `); 
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
                    <button style="margin: 4px; background-color: #0000ff55;" onclick="logs('info', 'info test debug')">info</button>
                    <button style="margin: 4px; background-color: #ffff0055;" onclick="logs('warn', 'warn test debug')">warn</button>
                    <button style="margin: 4px; background-color: #ff000055;" onclick="logs('error', 'error test debug')">error</button>
                    <button style="margin: 4px; background-color: #00000055;" onclick="logs('critical', 'critical test debug')">critical</button>
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
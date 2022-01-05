/*       -------        Debug file        -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var debugBuild = 12;

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
 *  Await function
 * 
 *      "ms" - count of miliseconds to await
 * 
 */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

/**
 *  Logging and erros!
 * 
 *      "type" - (info, warn, error, critical)
 *      "data" - text of log data
 * 
 */
function logs(type, data) {
         if (type == 'info')     { LOG.push([type, data]); console.info(data) }
    else if (type == 'warn')     { LOG.push([type, data]); console.warn(data) }
    else if (type == 'error')    { LOG.push([type, data]); console.error(data) }
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
             if (oneOfLog[0] == 'info')     { result += `<p style="color: white; background-color: blue;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'warn')     { result += `<p style="color: black; background-color: yellow;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'error')    { result += `<p style="color: white; background-color: red;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'critical') { result += `<p style="color: white; background-color: black;">${oneOfLog[1]}</p>` } 
    }
    return result
}

/**
 *  Output modal of logs
 */
function modalLog() { return modal('max', `
        <div class="update_modal">
            <h1 class="update_modal" style="font-family: 'Montserrat' !important; text-align: center; margin: 16px;">LOG</h1>
            <p style="font-family: 'Montserrat' !important; margin:16px;" class="update_modal">${logInHTML(LOG)}</p>
            <div style="display:flex;justify-content:center;">
                <button style="font-family: 'Montserrat' !important; cursor: pointer; border: 2px solid var(--main-text-color); border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''; theme(1)">Close</button>
            </div>
        </div>
    `)
}

deviceStorage('write', 'debugJSBuild', debugBuild);
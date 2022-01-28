/*       -------        Debug file        -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var debugBuild = 27
var BETA = true

var betaFolder = '', betaRepos = '';
if (BETA) {
    betaFolder += 'beta/'
    betaRepos += '-beta'
    eruda.init()
}

var CURRDATE = new Date()
var LOG = []

var REQUEST = new Object()
try {
    var parameters = window.location.href.split('?')[1].split('&')
    for (var i = 0; i < parameters.length; i++) { var par = parameters[i].split('='); REQUEST[par[0]] = par[1] }
} catch {
    console.log(`Page URL doesn't have any parameters`)
}

if (REQUEST.debug) { debugModal() }

/* Storage SVG icons */

var SVG = {

    /* header icons */
    theme    :`<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thMoon">
                 <rect fill="none" height="20" width="20"/>
                 <path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thSun">
                 <rect fill="none" height="20" width="20"/>
                 <path d="M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z"/>
               </svg>`,
    back     :`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="32px" viewBox="0 0 24 24" width="32px">
                 <rect fill="none" height="24" width="24"/>
                 <g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"/></g>
               </svg>`,

    /* other icons */
    settings :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
               </svg>`,
    support  :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
               </svg>`,
    list     :`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="28px" viewBox="0 0 24 24" width="28px">
                 <rect fill="none" height="24" width="24"/>
                 <path d="M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z"/>
               </svg>`,
    link     :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
               </svg>`,
    discord  :`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 71 55">
                 <g clip-path="url(#clip0)"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/></g>
                 <defs><clipPath id="clip0"><rect width="71" height="55" fill="white"/></clipPath></defs>
               </svg>`,

    /* navbar icons */
    home     :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
               </svg>`,
    calendar :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
               </svg>`,
    done     :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M18 9l-1.41-1.42L10 14.17l-2.59-2.58L6 13l4 4zm1-6h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/>
               </svg>`,
    other    :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
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
    else if (type == 'critical') { LOG.push([type, data]); sessionStorage.setItem('errorPageError', data); sessionStorage.setItem('errorPageLog', logInHTML(LOG)); location.assign(`/college${betaRepos}/error/`) }
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
             if (oneOfLog[0] == 'info')     { result += `<p style="background-color: #0000FF70; border-radius: 12px; padding: 4px 8px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'warn')     { result += `<p style="background-color: #ffff0070; border-radius: 12px; padding: 4px 8px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'error')    { result += `<p style="background-color: #ff000070; border-radius: 12px; padding: 4px 8px;">${oneOfLog[1]}</p>` } 
        else if (oneOfLog[0] == 'critical') { result += `<p style="background-color: #00000070; border-radius: 12px; padding: 4px 8px;">${oneOfLog[1]}</p>` } 
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
    for (var i = 0; i < localStorage.length; i++) { listLocalStrage += `<p style="font-family: 'Montserrat' !important; background-color: #00000020; border-radius: 12px; padding: 4px 8px; margin: 4px; font-size: 14px;">${localStorage.key(i)} - ${localStorage.getItem(localStorage.key(i))}</p>`  }
    modal('max', `
    <div style="max-height: 95%; overflow-y: auto; margin-right: 5%; margin-left: 5%; padding-right: 12px; padding-left: 12px; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">

        <h2 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px 6px; background-color: #ff000070; border-radius: 12px; padding: 6px;">${selfError}</h2>

        <p style="font-family: 'Montserrat' !important; margin: 16px; text-align: center; font-size: 20px;">Последние логи:</p>
        <p style="font-family: 'Montserrat' !important; margin: 16px;">${selfLog}</p>

        <p style="font-family: 'Montserrat' !important; margin:16px; text-align: center; font-size: 20px;">Ключи localStorage:</p>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">${listLocalStrage}</div>

        <div style="display:flex;justify-content:center;">
            <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''">Закрыть</button>
        </div>
    </div>
`)
}

function debugModal() {
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
    inj += `<div style="max-height: 95%; overflow-y: auto; margin-right: 5%; margin-left: 5%; padding-right: 12px; padding-left: 12px; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
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
                <button style="margin: 32px 0px; width: 100%; height: 64px; font-size: 24px; border-radius: 16px; background-color: #ff000055;" onclick="deleteLocalStorage()">DELETE ALL</button>

                <div style="display:flex;justify-content:center;">
                    <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''">Закрыть</button>
                </div>
            </div>`
    modal('max', inj)
}

deviceStorage('write', 'debugJSBuild', debugBuild);
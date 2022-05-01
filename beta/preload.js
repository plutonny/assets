/*       -------       Preload file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/* 
    This file using for important scripts and variables 
*/

var preloadBuild = 35
var siteVersion = '3.0.2'
var BETA = window.location.href.includes('beta')
if (BETA) { siteVersion += ' beta'; eruda.init() }

var CURRDATE = new Date()

var REQUEST = plutonny.get.URLAttributes(window.location.href)

/**
 *  Creating links
 * 
 *      to example:
 *          {
 *              type: str ('assets' or 'HTML')
 *              file: str (from root of repository, example: 'frames.js' or 'simple/')
 *              noBeta: bool (ignore beta repository)
 *          }
 * 
 */
function link(to) {
    if (window.location.href.includes('plutonny.ru')) {
        if (to.type == 'assets') {
            return `https://bebrarium.plutonny.ru/college/${(BETA && (!to.noBeta)) ? 'beta/' : ''}${to.file}`
        }
        if (to.type == 'HTML') {
            return `https://${(BETA && (!to.noBeta)) ? 'beta.' : ''}college.plutonny.ru/${to.file}`
        }
    }
    if (window.location.href.includes('plutonny.github.io')) {
        if (to.type == 'assets') {
            return `https://plutonny.github.io/assets/${(BETA && (!to.noBeta)) ? 'beta/' : ''}${to.file}`
        }
        if (to.type == 'HTML') {
            return `https://plutonny.github.io/college${(BETA && (!to.noBeta)) ? '-beta' : ''}/${to.file}`
        }
    }
    if (window.location.href.includes('127.0.0.1')) {
        if (to.type == 'assets') {
            return `http://127.0.0.1:5500/assets/${(BETA && (!to.noBeta)) ? 'beta/' : ''}${to.file}`
        }
        if (to.type == 'HTML') {
            return `http://127.0.0.1:5500/college${(BETA && (!to.noBeta)) ? '-beta' : ''}/${to.file}`
        }
    }
}

/* Week variable: num week and names (EN, RU, alternative) */
var WEEK = {

    num: luxon.DateTime.now().weekNumber

}
WEEK.name = {

    RU: WEEK.num % 2 == 1 ? 'зеленая' : 'желтая',
    EN: WEEK.num % 2 == 1 ? 'green' : 'yellow',

    alt: {
        RU: WEEK.num % 2 == 1 ? 'желтая' : 'зеленая',
        EN: WEEK.num % 2 == 1 ? 'yellow' : 'green',
    }

}

async function critical(func, comment) { 
    plutonny.console.error(func, comment)
    sessionStorage.setItem('errorPageError', comment)
    await plutonny.sleep(100)
    location.assign(link({type: 'HTML', file: 'error/'})) 
}

/**
 *  Work with localStorage
 * 
 *      deviceStorage.get(key)           get value of key
 *      deviceStorage.write(key, value)  write value in localStorage key
 *      deviceStorage.remove(key)        deleted key in localStorage
 *      deviceStorage.check(key)         check to avialible key in localStorage
 * 
 *      "key" and "value" - key and value of localStorage
 * 
 */
var deviceStorage = {
    get:    function(key)        { return localStorage.getItem(key) },
    write:  function(key, value) { try { localStorage.setItem(key, value); return true } catch { return false } },
    remove: function(key)        { try { localStorage.removeItem(key); return true } catch { return false } },
    check:  function(key)        { return (deviceStorage.get(key) == null || deviceStorage.get(key) == '') }
}

/**
 *  Outputted modal (div id "modal" need)
 * 
 *      "content" - HTML code for output on fullscreen
 * 
 */
async function modal(content) {
    try {
        await plutonny.sleep(200)
        if (deviceStorage.get('theme') == 'dark') { document.getElementById('theme-color').content = '#2a2a2a' } 
        if (deviceStorage.get('theme') == 'light') { document.getElementById('theme-color').content = '#9b9b9b' } 
        plutonny.output('modal', `
            <div class="max-modal">
                <style>
                    div.modal { position: fixed; height: 100%; width: 100%; background-color :#40404075; z-index: 99; }
                    div.max-modal { height: 100%; display: flex; justify-content: center; align-items: center; z-index: 100; }
                </style>
                ${content}
            </div>
        `) 
        return true
    } catch (e) {
        plutonny.console.error('preload.js: modal', e)
        return false
    }
}

/**
 *  Capitalize (first letter in upper case)
 */
function capitalize(text) { return text.charAt(0).toUpperCase() + text.slice(1) }

deviceStorage.write('preloadJSBuild', preloadBuild);
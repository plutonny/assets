/*       -------       Preload file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/* 
    This file using for important scripts and variables 
*/

var preloadBuild = 32
var siteVersion = '3.0.0'
var BETA = true

var betaFolder = '', betaRepos = '';
if (BETA) {
    siteVersion += ' beta'
    betaFolder += 'beta/'
    betaRepos += '-beta'
    eruda.init()
}

var CURRDATE = new Date()
var REQUEST = new Object()
try {
    var parameters = window.location.href.split('?')[1].split('&')
    for (var i = 0; i < parameters.length; i++) { var par = parameters[i].split('='); REQUEST[par[0]] = par[1] }
} catch {
    console.log(`preload.js: page URL doesn't have any parameters`)
}

/* Week variable: num week and names (EN, RU, alternative) */
var WEEK = {

    num: luxon.DateTime.now().weekNumber,

    name: {

        RU: WEEK % 2 == 1 ? 'зеленая' : 'желтая',
        EN: WEEK % 2 == 1 ? 'green' : 'yellow',

        alt: {
            RU: WEEK % 2 == 1 ? 'желтая' : 'зеленая',
            EN: WEEK % 2 == 1 ? 'yellow' : 'green',
        }

    }

}

/**
 *  Work with page
 * 
 *      page.output(id, data)  write in HTML element with id (variable id) data (variable data)
 *      page.error(data)       outputted default error in console + mini modal in top of the page
 *      page.critical(data)    returned in error page with err info (variable data)
 *      page.sleep(ms)         create pause of work any js (in ms)
 * 
 */
var page = {
    output:   function(id, data)   { try { document.getElementById(id).innerHTML = data; return true } catch (e) { page.critical(`Error: output function (maybe couldn't find tag id ${id}): (${e})`); return false } },
    error:    async function(data) { console.error(data); document.getElementById('modal').innerHTML += `<div class="mini-modal"><style>div.modal { position: fixed; height: 72px; width: 100%; z-index: 99; } div.mini-modal { display: flex; align-items: center; height: 36px; z-index: 100; margin: 8px; padding-left: 12px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 100px; }</style><p style="margin: 0;">${data}</p></div>`; await page.sleep(2000); page.output('modal', '') },
    critical: function(data)       { console.error(data); sessionStorage.setItem('errorPageError', data); location.assign(`/college${betaRepos}/error/`) },
    sleep:    function(ms)         { return new Promise(resolve => setTimeout(resolve, ms)) }
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
        await page.sleep(200)
        if (deviceStorage.get('theme') == 'dark') { document.getElementById('theme-color').content = '#2a2a2a' } 
        if (deviceStorage.get('theme') == 'light') { document.getElementById('theme-color').content = '#9b9b9b' } 
        page.output('modal', `
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
        page.error(`Error: modal function (${e})`)
        return false
    }
}

deviceStorage.write('preloadJSBuild', preloadBuild);
/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/*  ---  Global variables  ---  */
var storageVersion = '3.0', storageBuild = '49';
var BETA = true;

/**
 *  Service worker enable function
 */
function enableLogger() {
    if ('serviceWorker' in navigator) { 
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js').then(
                function(registration) {
                    if (BETA) { logs('info', `ServiceWorker: registration successful with scope ${registration.scope}`)}
                },
                function(e) { 
                    logs('error', `Error: ServiceWorker registration failed: ${e}`)
                }
            ).catch(function(e) { logs('error', `Error: ServiceWorker function (${e})`) })
        })
    }
    else { logs('info', 'Warning: Service worker is not supported') }
}

/**
 *  Outputted header
 * 
 *      headerText     - text in header
 *      buttonTheme    - (bool) enable or disable theme button
 *      buttonBack     - (bool) enable or disable back to home button
 *      buttonSettings - (bool) enable or disable settings button
 * 
 *      DONT use enableTheme and enableSettings in one time!!!
 * 
 */
 function header(headerText, buttonTheme, buttonBack, buttonSettings) {
    try {
        var inj = '';
        if (buttonTheme && settings('get', 'enablethemebutton') == 'true' && settings('get', 'typetheme') == 1) { 
            inj += `<button id="theme_button" class="theme_header_button pc" onclick="theme(0)">Сменить тему</button>`
            inj += `<button id="theme_button" class="theme_header_button mobile" style="border: none !important;" onclick="theme(0)"><img style="width: 32px; height: 32px;" id="mobile_theme_button" src=""></button>`
        }
        if (buttonBack) {
            inj += `<button id="theme_button" class="back_button mobile" style="border: none !important;" onclick="activities('backhome')"><img style="width: 32px; height: 32px;" id="back_button" src=""></button>`
        }
        if (buttonSettings) {
            inj += `<button id="theme_button" class="settings_header_button pc" onclick="activities('settings')">Настройки</button>`
            inj += `<button id="theme_button" class="settings_header_button mobile" style="border: none !important;" onclick="activities('settings')"><img style="width: 32px; height: 32px;" id="mobile_settings_button" src=""></button>`
        }
        output(`header`, `
            <div class="mobile_gorisontal_void"></div>
            <p style="font-size: 20px; margin-bottom: 8px; z-index: 10;">${headerText}</p>
            <div class="pc_gorisontal_void"></div>
            <div class="mobile_gorisontal_void"></div>
            ${inj}
        `);
    } catch (e) { logs('critical', `Error: header function (${e})`) }
}
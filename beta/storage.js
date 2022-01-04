/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/*  ---  Global variables  ---  */
var storageVersion = '3.0', storageBuild = '49';
var BETA = true;

var CURRDATE = new Date();
var betaFolder = '';
if (BETA) {
    betaFolder += 'beta/'; 
    storageVersion += ' beta'; 
    output('csc11-title-of-page', 'Beta version'); 
};
logs('info', `
    Storage: build ${deviceStorage('get', 'storageJSBuild')}
    Debug: build ${deviceStorage('get', 'debugJSBuild')}
    Home: build ${deviceStorage('get', 'homeBuildPage')}
    Timetableweek: build ${deviceStorage('get', 'timetableweekBuildPage')}
    Other: build ${deviceStorage('get', 'otherBuildPage')}
    Gtable: build ${deviceStorage('get', 'gtableBuildPage')}
    Attendance: build ${deviceStorage('get', 'attendanceBuildPage')}
    Simple: build ${deviceStorage('get', 'simpleBuildPage')}
    Grades: build ${deviceStorage('get', 'gradesBuildPage')}
    Support: build ${deviceStorage('get', 'supportBuildPage')}
`);
var weekNum = luxon.DateTime.now().weekNumber, weekNameRU = '', weekNameEN = ''; 
if (weekNum % 2 == 1) { weekNameRU = 'желтая'; weekNameEN = 'yellow' } 
else                  { weekNameRU = 'зеленая'; weekNameEN = 'green' }
var theme_button = document.getElementById('theme_button'); if (theme_button) { theme_button.addEventListener('click', theme) };
var back_button = document.getElementById('back_button'); if (back_button) { back_button.addEventListener('click', activities) };
var lightThemeColors = `:root {
    --root-text-color    :#101520;
    --active-text-color  :#505050;
    --primary-bg-color   :#e9e9e9;
    --secondary-bg-color :#;
    --root-button-color  :#cccccc;
    --active-buton-color :#b5b5b5;
    --root-table-bg      :#f5f5f5;
    --week-green         :#00e600;
    --week-yellow        :#e6e600;
    --week-color         :var(--week-${weekNameEN}) !important;
}`;
var darkThemeColors  = `:root {
    --root-text-color    :#f4f4f4;
    --active-text-color  :#aaaaaa;
    --primary-bg-color   :#111111;
    --secondary-bg-color :#;
    --root-button-color  :#252525;
    --active-buton-color :#333333;
    --root-table-bg      :#0a0a0a;
    --week-green         :#006600;
    --week-yellow        :#808000;
    --week-color         :var(--week-${weekNameEN}) !important;
}`;

/**
 *  Outputted modal (div id "modal" need)
 * 
 *      "type" - mini (small text on top of the page) or max (modal on fullscreen)
 * 
 */
 async function modal(type, content) {
    await sleep(500)
         if (type == 'info') { output('modal', `<div class="mini_modal">${content}</div>`); await sleep(2500); doutput('modal', '') }
    else if (type == 'max')  { if (settings('get','theme') == 'dark') { document.getElementById('theme-color').content = '#262626' } if (settings('get','theme') == 'light') { document.getElementById('theme-color').content = '#9b9b9b' } output('modal', `<div class="max_modal">${content}</div>`) }
}

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

deviceStorage('write', 'storageJSBuild', storageBuild);
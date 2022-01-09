/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/*  ---  Global variables  ---  */
var storageVersion = '3.0.0', storageBuild = '56';
var BETA = true;

var CURRDATE = new Date();
var weekNum = luxon.DateTime.now().weekNumber, weekNameRU = '', weekNameEN = ''; 
if (weekNum % 2 == 1) { weekNameRU = 'желтая'; weekNameEN = 'yellow' } 
else                  { weekNameRU = 'зеленая'; weekNameEN = 'green' }
var lightThemeColors = `:root {
    --root-text-color      :#101520;
    --active-text-color    :#606060;
    --primary-bg-color     :#e9e9e9;
    --secondary-bg-color   :#f5f5f5;
    --root-button-color    :#dddddd;
    --hover-button-color   :#;
    --active-button-color  :#;
    --root-navbar-bg-color :#e0e0e0;
    --navbar-box-color     :#aaaaaa;
    --week-green           :#8eff8b;
    --week-yellow          :#fffa7b;
    --week-color           :var(--week-${weekNameEN}) !important;
}`;
var darkThemeColors  = `:root {
    --root-text-color      :#f4f4f4;
    --active-text-color    :#9a9a9a;
    --primary-bg-color     :#181818;
    --secondary-bg-color   :#000000;
    --root-button-color    :#303030;
    --hover-button-color   :#;
    --active-button-color  :#;
    --root-navbar-bg-color :#111111;
    --navbar-box-color     :#080808;
    --week-green           :#114110;
    --week-yellow          :#454306;
    --week-color           :var(--week-${weekNameEN}) !important;
}`;

/*  ---  Prepare to work  ---  */
if (deviceStorage('check', 'theme'))                                                       { logs('warn', 'Warning: theme is undefined, set theme to light');                  deviceStorage('write', 'theme', 'light') }
if (deviceStorage('check', 'enablethemebutton'))                                           { logs('warn', 'Warning: theme button is undefined, turned it on');                 deviceStorage('write', 'enablethemebutton', 'true') }
if (deviceStorage('check', 'tytheme3time') && deviceStorage('get', 'typetheme') == 3)      { logs('warn', 'Warning: script found inconsistency in localStorage and fixes it'); deviceStorage('write', 'typetheme', 1) }
if (deviceStorage('check', 'typetheme'))                                                   { logs('warn', 'Warning: theme type is undefined, set to default');                 deviceStorage('write', 'typetheme', 1) }
if (deviceStorage('get', 'typetheme') == 2 || deviceStorage('get', 'typetheme') == 3)      { deviceStorage('write', 'enablethemebutton', `false`) }

var onDateSunriseSunset = SunCalc.getTimes(CURRDATE, 64.4, 40.4)
if (deviceStorage('get', 'typetheme') == 2) { 
      if (onDateSunriseSunset.sunrise < CURRDATE && CURRDATE < onDateSunriseSunset.sunset) { deviceStorage('write', 'theme', 'light') } 
    else                                                                                   { deviceStorage('write', 'theme', 'dark') } 
}

if (deviceStorage('get', 'typetheme') == 3) {
    var themeTimeFrom = '', themeTimeTo = '', themeTimeNow = parseInt(String(CURRDATE.getHours()) + String(CURRDATE.getMinutes()))
    themeTimeFrom = parseInt(deviceStorage('get', 'tytheme3time').charAt(0) + deviceStorage('get', 'tytheme3time').charAt(1) + deviceStorage('get', 'tytheme3time').charAt(3) + deviceStorage('get', 'tytheme3time').charAt(4)); 
    themeTimeTo = parseInt(deviceStorage('get', 'tytheme3time').charAt(5) + deviceStorage('get', 'tytheme3time').charAt(6) + deviceStorage('get', 'tytheme3time').charAt(8) + deviceStorage('get', 'tytheme3time').charAt(9));
    if (themeTimeFrom < themeTimeTo) {
          if (themeTimeFrom < themeTimeNow && themeTimeNow < themeTimeTo)                                              { deviceStorage('write', 'theme', 'light') } 
        else                                                                                                           { deviceStorage('write', 'theme', 'dark') } 
    }
    else if (themeTimeFrom > themeTimeTo) {
          if ((themeTimeFrom < themeTimeNow && themeTimeNow < 23) || (0 < themeTimeNow && themeTimeNow < themeTimeTo)) { deviceStorage('write', 'theme', 'light') } 
        else                                                                                                           { deviceStorage('write', 'theme', 'dark') } 
    }
}

var betaFolder = '';
if (BETA) {
    betaFolder += 'beta/'; 
    storageVersion += ' beta'; 
    output('csc11-title-of-page', 'Beta version');
};
function outBetaNotes() {
    if (BETA) {
        output(`beta`, `
            <div style="margin-left: 28px; margin-top:48px; margin-right: 28px;">
                <p><b style="font-family: 'Montserrat' !important;">Перед выходом в релиз:</b></p>
                <p style="font-family: 'Montserrat' !important;"><b style="font-family: 'Montserrat' !important;">Все файлы .html:</b> поменять директории файлов на релиз</p>
                <p style="font-family: 'Montserrat' !important;"><a style="font-family: 'Montserrat' !important;" href="/storage/${betaFolder}debug.html"><b style="font-family: 'Montserrat' !important;">storage.js и service-worker.js:</b></a> переменная BETA</p>
                <p><button style="font-family: 'Montserrat' !important; border: 2px solid var(--root-text-color); background-color: var(--root-button-color); width: 100%; height: 64px; font-size: 24px; border-radius: 16px; cursor: pointer;" onclick="modalLog()">Консоль</button></p>
            </div>
        `);
    }
}

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

logs('info', `Current builds (version ${storageVersion}):
    Storage:        build ${deviceStorage('get', 'storageJSBuild')}
    Debug:          build ${deviceStorage('get', 'debugJSBuild')}
    Home:           build ${deviceStorage('get', 'homeBuildPage')}
    Timetableweek:  build ${deviceStorage('get', 'timetableweekBuildPage')}
    Other:          build ${deviceStorage('get', 'otherBuildPage')}
    Gtable:         build ${deviceStorage('get', 'gtableBuildPage')}
    Attendance:     build ${deviceStorage('get', 'attendanceBuildPage')}
    Simple:         build ${deviceStorage('get', 'simpleBuildPage')}
    Grades:         build ${deviceStorage('get', 'gradesBuildPage')}
    Support:        build ${deviceStorage('get', 'supportBuildPage')}
`);

/*  ---  Functions to work  ---  */


/**
 *  Work with theme in site (style id "root-colors-theme" need)
 *      
 *      "type" - load or change, I think all clear
 * 
 */
async function theme(type) {
    try {
        var themeCurrent = deviceStorage('get', 'theme');
        if (type == 'change') {
                 if (themeCurrent == 'light') { deviceStorage('write', 'theme', 'dark'); theme('load') } 
            else if (themeCurrent == 'dark')  { deviceStorage('write', 'theme', 'light'); theme('load') };
        } 
        if (type == 'load') {
                 if (themeCurrent == 'light') { output('root-colors-theme', `${lightThemeColors} #thSun { display: none; }`); document.getElementById('theme-color').content = '#e9e9e9' } 
            else if (themeCurrent == 'dark')  { output('root-colors-theme', `${darkThemeColors} #thMoon { display: none; }`); document.getElementById('theme-color').content = '#181818' }
        }
    } catch (e) { logs('critical', `Error: theme function (${e})`) }
}

/**
 *  Universal function to navigation on site
 * 
 *      siteBack     - backed page (for back button)
 *      settingsPage - returned to settings page
 * 
 */
async function activePage(type) {
     if (type == 'siteBack')     { history.back() }
else if (type == 'settingsPage') { location.assign(`storage/${betaFolder}settings.html`) }
else                             { con('error', `Error: activities function not found instruction to "${type}"`) }
}

/**
 *  Outputted modal (div id "modal" need)
 * 
 *      "type" - mini (small text on top of the page) or max (modal on fullscreen)
 * 
 */
async function modal(type, content) {
    try {
        await sleep(200)
        if (type == 'info') { 
            output('modal', `<div class="mini_modal">${content}</div>`); 
            await sleep(2000); 
            output('modal', '') 
        }
        else if (type == 'max')  { 
            if (deviceStorage('get','theme') == 'dark') { document.getElementById('theme-color').content = '#2a2a2a' } 
            if (deviceStorage('get','theme') == 'light') { document.getElementById('theme-color').content = '#9b9b9b' } 
            output('modal', `
                <div class="max-modal">
                    <style>div.modal { position: fixed; height: 100%; width: 100%; background-color :#40404075; }</style>
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
    else { logs('warn', 'Warning: Service worker is not supported') }
}

/**
 *  Outputted navbar (div id "navbar" need)
 * 
 *      navbarActive - current opened page (home, other, grades, attendance)
 * 
 */
function navbar(navbarActive) {
    output('navbar', `
        <style>
            .navbar {
                margin: 8px;
                padding: 6px;
                position: fixed;
                border-radius: 100px;
                background-color: var(--root-navbar-bg-color);
                top: calc(100% - 79px);
                width: calc(100% - 28px);
                box-shadow: 0px 0px 8px var(--navbar-box-color);
            }

            .${navbarActive}Navbar { color: var(--root-text-color) !important; }

        </style>
        
        <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;">
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/home.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="homeNavbar" style="color: #707070; fill: currentColor; margin: 0;">${SVG.home_icon}</p>
                        <p class="homeNavbar" style="color: #707070; margin: 0; font-size: 14px;">главная</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/grades.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="gradesNavbar" style="color: #707070; fill: currentColor; margin: 0;">${SVG.done_icon}</p>
                        <p class="gradesNavbar" style="color: #707070; margin: 0; font-size: 14px;">оценки</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/attendance.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="attendanceNavbar" style="color: #707070; fill: currentColor; margin: 0;">${SVG.calendar_icon}</p>
                        <p class="attendanceNavbar" style="color: #707070; margin: 0; font-size: 14px;">явка</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/other.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="otherNavbar" style="color: #707070; fill: currentColor; margin: 0;">${SVG.other_icon}</p>
                        <p class="otherNavbar" style="color: #707070; margin: 0; font-size: 14px;">другое</p>
                    </div>
                </a>
            </div>
        </div>
    `);
}

/**
 *  Outputted header (div id "header" need)
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
        if (buttonTheme && deviceStorage('get', 'enablethemebutton') == 'true' && deviceStorage('get', 'typetheme') == 1) {
            inj += `<button 
                        class="theme_button" 
                        style="z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; border: none; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
                        onclick="theme('change')">
                            ${SVG.theme_button}
                    </button>`
        }
        if (buttonBack) {
            inj += `<button 
                        class="back_button" 
                        style="z-index: 90; border: none !important; fill: currentColor; position: absolute; margin-left: 14px; margin-top: 14px; border-radius: 100px; border: none; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
                        onclick="activePage('siteBack')">
                            ${SVG.back_button}
                    </button>`
        }
        if (buttonSettings) {
            inj += `<button 
                        class="settings_button" 
                        style="z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; border: none; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
                        onclick="activePage('settingsPage')">
                            ${SVG.settings_button}
                    </button>`
        }
        output(`header`, `
            <style>.header { padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none; }</style>
            <div style="margin-right: auto;"></div>
            <p style="text-align: center; font-size: 20px; margin-bottom: 8px; z-index: 10;">${headerText}</p>
            <div style="margin-right: auto;"></div>
            ${inj}
        `)
        return true
    } catch (e) { 
        logs('critical', `Error: header function (${e})`) 
        return false
    }
}

deviceStorage('write', 'storageJSBuild', storageBuild); theme('load'); enableLogger()
/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/*  ---  Global variables  ---  */
var storageVersion = '3.0.0', storageBuild = 62;

var weekNum = luxon.DateTime.now().weekNumber, weekNameRU = '', weekNameEN = ''; 
if (weekNum % 2 == 1) { weekNameRU = 'зеленая'; weekNameEN = 'green' } 
else                  { weekNameRU = 'желтая'; weekNameEN = 'yellow' }

var lightThemeColors = `:root {
    --root-text-color      :#101520;
    --active-text-color    :#353535;
    --primary-bg-color     :#e9e9e9;
    --secondary-bg-color   :#f5f5f5;
    --root-button-color    :#dddddd;
    --hover-button-color   :#d2d2d2;
    --active-button-color  :#c0c0c0;
    --root-navbar-bg-color :#e0e0e0;
    --navbar-box-color     :#aaaaaa;
    --week-green           :#8eff8b;
    --week-yellow          :#fffa7b;
    --week-color           :var(--week-${weekNameEN}) !important;
}`;
var darkThemeColors  = `:root {
    --root-text-color      :#f4f4f4;
    --active-text-color    :#a9a9a9;
    --primary-bg-color     :#181818;
    --secondary-bg-color   :#000000;
    --root-button-color    :#303030;
    --hover-button-color   :#3a3a3a;
    --active-button-color  :#454545;
    --root-navbar-bg-color :#111111;
    --navbar-box-color     :#080808;
    --week-green           :#114110;
    --week-yellow          :#454306;
    --week-color           :var(--week-${weekNameEN}) !important;
}`;

/*  ---  Prepare to work  ---  */
if (deviceStorage('check', 'theme'))
    { logs('warn', 'Warning: theme is undefined, set theme to light'); deviceStorage('write', 'theme', 'light') }

if (deviceStorage('get', 'theme') != 'light' && deviceStorage('get', 'theme') != 'dark')
    { logs('warn', 'Warning: theme is incorrect, set theme to light'); deviceStorage('write', 'theme', 'light') }

if (deviceStorage('check', 'enablethemebutton'))
    { logs('warn', 'Warning: theme button is undefined, turned it on'); deviceStorage('write', 'enablethemebutton', 'true') }

if (deviceStorage('check', 'tytheme3time') && deviceStorage('get', 'typetheme') == 3)
    { logs('warn', 'Warning: script found inconsistency in localStorage and fixes it'); deviceStorage('write', 'typetheme', 1) }

if (deviceStorage('check', 'typetheme'))
    { logs('warn', 'Warning: theme type is undefined, set to default'); deviceStorage('write', 'typetheme', 1) }

if (deviceStorage('get', 'typetheme') == 2 || deviceStorage('get', 'typetheme') == 3)
    { deviceStorage('write', 'enablethemebutton', `false`) }

var onDateSunriseSunset = SunCalc.getTimes(CURRDATE, 64.4, 40.4)
if (deviceStorage('get', 'typetheme') == 2) { 
      if (onDateSunriseSunset.sunrise < CURRDATE && CURRDATE < onDateSunriseSunset.sunset) { deviceStorage('write', 'theme', 'light') } 
    else                                                                                   { deviceStorage('write', 'theme', 'dark') } 
}

if (deviceStorage('get', 'typetheme') == 3) {
    var themeTimeNow = parseInt(String(CURRDATE.getHours()) + String(CURRDATE.getMinutes()))
    var themeTimeFrom = parseInt(deviceStorage('get', 'tytheme3time').charAt(0) + deviceStorage('get', 'tytheme3time').charAt(1) + deviceStorage('get', 'tytheme3time').charAt(3) + deviceStorage('get', 'tytheme3time').charAt(4)); 
    var themeTimeTo = parseInt(deviceStorage('get', 'tytheme3time').charAt(5) + deviceStorage('get', 'tytheme3time').charAt(6) + deviceStorage('get', 'tytheme3time').charAt(8) + deviceStorage('get', 'tytheme3time').charAt(9));
    if (themeTimeFrom < themeTimeTo) {
          if (themeTimeFrom < themeTimeNow && themeTimeNow < themeTimeTo)                                              { deviceStorage('write', 'theme', 'light') } 
        else                                                                                                           { deviceStorage('write', 'theme', 'dark') } 
    }
    else if (themeTimeFrom > themeTimeTo) {
          if ((themeTimeFrom < themeTimeNow && themeTimeNow < 23) || (0 < themeTimeNow && themeTimeNow < themeTimeTo)) { deviceStorage('write', 'theme', 'light') } 
        else                                                                                                           { deviceStorage('write', 'theme', 'dark') } 
    }
}

if (BETA) {
    storageVersion += ' beta';
}

function outBetaNotes() {
    if (BETA) {
        output(`beta`, `
            <div>
                <p><b style="font-family: 'Montserrat' !important;">Перед выходом в релиз:</b></p>
                <p style="font-family: 'Montserrat' !important;"><b style="font-family: 'Montserrat' !important;">Все файлы .html:</b> поменять директории файлов на релиз</p>
                <p style="font-family: 'Montserrat' !important;"><a style="font-family: 'Montserrat' !important; text-decoration: none;" href="/assets/${betaFolder}debug.html"><b style="font-family: 'Montserrat' !important;">storage.js и service-worker.js:</b></a> переменная BETA</p>
                <p><button style="font-family: 'Montserrat' !important; border: none; width: 100%; height: 64px; font-size: 24px; border-radius: 16px; cursor: pointer;" onclick="modalLog()">Консоль</button></p>
            </div>
        `);
    }
}

logs('info', `Current builds (version ${storageVersion}):
    { Storage JS:     build ${deviceStorage('get', 'storageJSBuild')} },
    { Timeable JS:    build ${deviceStorage('get', 'timetableJSBuild')} },
    { Preload JS:     build ${deviceStorage('get', 'preloadJSBuild')} },
    { Home:           build ${deviceStorage('get', 'homeBuildPage')} },
    { Timetableweek:  build ${deviceStorage('get', 'timetableweekBuildPage')} },
    { Other:          build ${deviceStorage('get', 'otherBuildPage')} },
    { Gtable:         build ${deviceStorage('get', 'gtableBuildPage')} },
    { Simple:         build ${deviceStorage('get', 'simpleBuildPage')} },
    { Support:        build ${deviceStorage('get', 'supportBuildPage')} }.
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
                 if (themeCurrent == 'light') { output('root-colors-theme', `${lightThemeColors} #thSun { display: none; }`); await sleep(55); document.getElementById('theme-color').content = '#e9e9e9' } 
            else if (themeCurrent == 'dark')  { output('root-colors-theme', `${darkThemeColors} #thMoon { display: none; }`); await sleep(55); document.getElementById('theme-color').content = '#181818' }
        }
    } catch (e) { logs('critical', `Error: theme function (${e})`) }
}

/**
 *  For gtable page script
 */
async function gTableTheme() {
    output('root-colors-theme', `${lightThemeColors} #thSun { display: none; }`)
    await sleep(70)
    document.getElementById('theme-color').content = '#ffffff'
    await sleep(5000)
    output('loadText', '')
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
else if (type == 'settingsPage') { location.assign(`/assets/${betaFolder}settings.html`) }
else                             { con('error', `Error: activities function not found instruction to "${type}"`) }
}

/**
 *  Service worker enable function
 */
function enableLogger() {
    if ('serviceWorker' in navigator) { 
        window.addEventListener('load', function() {
            navigator.serviceWorker.register(`/assets/${betaFolder}service-worker.js`).then(
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
                z-index: 10;
                margin: 8px;
                padding: 6px;
                position: fixed;
                border-radius: 100px;
                background-color: var(--root-navbar-bg-color);
                top: calc(100% - 73px);
                width: calc(100% - 28px);
                box-shadow: 0px 0px 8px var(--navbar-box-color);
            }

            .${navbarActive}Navbar { color: var(--root-text-color) !important; }

        </style>
        
        <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;">
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/home.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="homeNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.home_icon}</p>
                        <p class="homeNavbar" style="color: #707070; margin: 0; font-size: 14px;">главная</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/gtable.html?table=grades">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="gradesNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.done_icon}</p>
                        <p class="gradesNavbar" style="color: #707070; margin: 0; font-size: 14px;">оценки</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/gtable.html?table=attendance">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="attendanceNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.calendar_icon}</p>
                        <p class="attendanceNavbar" style="color: #707070; margin: 0; font-size: 14px;">явка</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college-beta/other.html">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="otherNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.other_icon}</p>
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
                        style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
                        onclick="theme('change')">
                            ${SVG.theme_button}
                    </button>`
        }
        if (buttonBack) {
            inj += `<button 
                        class="back_button" 
                        style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; position: absolute; margin-left: 14px; margin-top: 14px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
                        onclick="activePage('siteBack')">
                            ${SVG.back_button}
                    </button>`
        }
        if (buttonSettings) {
            inj += `<button 
                        class="settings_button" 
                        style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: var(--primary-bg-color)" 
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
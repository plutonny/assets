/*       -------       Storage file       -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/*  ---  Global variables  ---  */
var storageVersion = '3.0.0', storageBuild = 72

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

var THEME = {
    light: `:root {
            --root-text-color      :#101520;
            --active-text-color    :#353535;
            --primary-bg-color     :#e9e9e9;
            --secondary-bg-color   :#f5f5f5;
            --root-button-color    :#dddddd;
            --hover-button-color   :#d2d2d2;
            --active-button-color  :#c0c0c0;
            --root-navbar-bg-color :#e0e0e0;
            --navbar-box-color     :#aaaaaa;
            --week-green           :#7cf779;
            --week-yellow          :#f3ee67;
            --week-color           :var(--week-${WEEK.name.EN}) !important;
        }`,
    dark: `:root {
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
            --week-color           :var(--week-${WEEK.name.EN}) !important;
        }`
}

/*  ---  Prepare to work  ---  */

if (BETA) {
    output('csc11-title-of-page', 'Beta version')
    storageVersion += ' beta'
    console.log(`
    Перед выходом в релиз:
        • Все файлы .html: поменять директории файлов на релиз
        • debug.js: переменная BETA
        
    Чтобы получить модальное окно дебага, введите команду: debugModal() или перейдите по ссылке: ${window.location.href.charAt(window.location.href.length - 1) == '/' ? `${window.location.href}?debug=true` : `${window.location.href}&debug=true`}
    `)
}

console.log(`Current builds (version ${storageVersion}):
    { Storage JS:  build ${deviceStorage('get', 'storageJSBuild')} },
    { Timeable JS: build ${deviceStorage('get', 'timetableJSBuild')} },
    { Debug JS:    build ${deviceStorage('get', 'debugJSBuild')} },
    { Home:        build ${deviceStorage('get', 'homeBuildPage')} },
    { Other:       build ${deviceStorage('get', 'otherBuildPage')} },
    { Gtable:      build ${deviceStorage('get', 'gtableBuildPage')} },
    { Simple:      build ${deviceStorage('get', 'simpleBuildPage')} },
    { Settings:    build ${deviceStorage('get', 'settingsBuildPage')} },
    { Support:     build ${deviceStorage('get', 'supportBuildPage')} }.
`);

/*  ---  Functions to work  ---  */


/**
 *  Work with theme in site (style id "root-colors-theme" need)
 *      
 *      theme.prepare() returned current theme in bool format (true - dark theme, false - light theme)
 *      theme.load() loaded theme (used in storage.js and in modals)
 *      theme.change() changed theme to reverse and load theme again
 * 
 */
var theme = {
    prepare: function() {
        if (deviceStorage('check', 'themeType3Time') && deviceStorage('get', 'themeType') == 3)
            { console.warn('Warning: script found inconsistency in localStorage and fixes it'); deviceStorage('write', 'themeType', 1) }

        if (deviceStorage('check', 'themeType'))
            { console.warn('Warning: theme type is undefined, set to default'); deviceStorage('write', 'themeType', 1) }

        if (deviceStorage('check', 'theme'))
            { console.warn('Warning: theme is undefined, set theme to light'); deviceStorage('write', 'theme', 'light') }

        if (deviceStorage('get', 'theme') != 'light' && deviceStorage('get', 'theme') != 'dark')
            { console.warn('Warning: theme is incorrect, set theme to light'); deviceStorage('write', 'theme', 'light') }

        if (deviceStorage('check', 'themeEnableThemeButton'))
            { console.warn('Warning: theme button is undefined, turned it on'); deviceStorage('write', 'themeEnableThemeButton', true) }

        if (deviceStorage('get', 'themeType') == 2 || deviceStorage('get', 'themeType') == 3)
            { deviceStorage('write', 'themeEnableThemeButton', false) }

        try {
            var onDateSunriseSunset = SunCalc.getTimes(CURRDATE, 64.4, 40.4)
            if (deviceStorage('get', 'themeType') == 2) { 
                if (onDateSunriseSunset.sunrise < CURRDATE && CURRDATE < onDateSunriseSunset.sunset) { deviceStorage('write', 'theme', 'light') } 
                else                                                                                 { deviceStorage('write', 'theme', 'dark') } 
            }
            /*
            if (deviceStorage('get', 'themeType') == 3) {
                var themeTimeNow = parseInt(String(CURRDATE.getHours()) + (CURRDATE.getMinutes() < 10 ? '0' + String(CURRDATE.getMinutes()) : String(CURRDATE.getMinutes()))) 
                var themeTimeFrom = parseInt(deviceStorage('get', 'themeType3Time').charAt(0) + deviceStorage('get', 'themeType3Time').charAt(1) + deviceStorage('get', 'themeType3Time').charAt(3) + deviceStorage('get', 'themeType3Time').charAt(4)); 
                var themeTimeTo = parseInt(deviceStorage('get', 'themeType3Time').charAt(5) + deviceStorage('get', 'themeType3Time').charAt(6) + deviceStorage('get', 'themeType3Time').charAt(8) + deviceStorage('get', 'themeType3Time').charAt(9));
                if (themeTimeFrom < themeTimeTo) {
                    if (themeTimeFrom < themeTimeNow && themeTimeNow < themeTimeTo)                                              { deviceStorage('write', 'theme', 'light') } 
                    else                                                                                                         { deviceStorage('write', 'theme', 'dark') } 
                }
                else if (themeTimeFrom > themeTimeTo) {
                    if ((themeTimeFrom < themeTimeNow && themeTimeNow < 23) || (0 < themeTimeNow && themeTimeNow < themeTimeTo)) { deviceStorage('write', 'theme', 'light') } 
                    else                                                                                                         { deviceStorage('write', 'theme', 'dark') } 
                }
            }
            */
        } catch (e) { error(true, `Error: theme function prepare (${e})`) }
        if (deviceStorage('get', 'theme') == 'light') { return false }
        if (deviceStorage('get', 'theme') == 'dark')  { return true }
    },
    change: async function() {
          if (theme.prepare()) { deviceStorage('write', 'theme', 'light'); theme.load() }
        else                   { deviceStorage('write', 'theme', 'dark'); theme.load() }
    }, 
    load: async function() {
          if (theme.prepare()) { output('root-colors-theme', `${THEME.dark} #thMoon { display: none; }`); await sleep(75); document.getElementById('theme-color').content = '#181818' }
        else                   { output('root-colors-theme', `${THEME.light} #thSun { display: none; }`); await sleep(75); document.getElementById('theme-color').content = '#e9e9e9' }
    }
}

/**
 *  For gtable page script
 */
async function gTableTheme() {
    output('root-colors-theme', `${THEME.light} #thSun { display: none; }`)
    await sleep(70)
    document.getElementById('theme-color').content = '#ffffff'
    await sleep(5000)
    output('loadText', '')
}

/**
 *  Service worker enable function
 */
function enableLogger() {
    if ('serviceWorker' in navigator) { 
        window.addEventListener('load', function() {
            navigator.serviceWorker.register(`/college${betaRepos}/service-worker.js`).then(
                function(registration) {
                    if (BETA) { console.log(`ServiceWorker: registration with scope ${registration.scope}`)}
                },
                function(e) { 
                    error(false, `Error: ServiceWorker registration failed: ${e}`)
                }
            ).catch(function(e) { error(false, `Error: ServiceWorker function (${e})`) })
        })
    }
    else { console.warn('Warning: Service worker is not supported') }
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
                <a style="text-decoration: none;" href="/college${betaRepos}/">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="homeNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.home}</p>
                        <p class="homeNavbar" style="color: #707070; margin: 0; font-size: 14px;">главная</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college${betaRepos}/gtable/?pres=grades">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="gradesNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.done}</p>
                        <p class="gradesNavbar" style="color: #707070; margin: 0; font-size: 14px;">оценки</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college${betaRepos}/gtable/?pres=attendance">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="attendanceNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.calendar}</p>
                        <p class="attendanceNavbar" style="color: #707070; margin: 0; font-size: 14px;">явка</p>
                    </div>
                </a>
            </div>
            <div style="width: 20%">
                <a style="text-decoration: none;" href="/college${betaRepos}/other/">
                    <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                        <p class="otherNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.other}</p>
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
 * 
 */
function header(headerText, buttonTheme, buttonBack) {
    try {
        var inj = '';
        if (buttonTheme && deviceStorage('get', 'themeEnableThemeButton') == 'true' && deviceStorage('get', 'themeType') == 1) {
            inj += `<button 
                        class="theme_button" 
                        style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: transparent;" 
                        onclick="theme.change()">
                            ${SVG.theme}
                    </button>`
        }
        if (buttonBack) {
            inj += `<button 
                        class="back_button" 
                        style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; position: absolute; margin-left: 8px; margin-top: 14px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: transparent;" 
                        onclick="history.back()">
                            ${SVG.back}
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
        error(true, `Error: header function (${e})`) 
        return false
    }
}

if (deviceStorage('get', 'noDisplayUpdate30') != 'true') { modal(`
    <div style=" margin-right: 7%; margin-left: 7%; max-height: 95%; overflow-y: auto; background-color: var(--primary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
        <h2 style="font-family: 'Montserrat' !important; text-align: center; margin:16px;">Вышло обновление!</h2>
        <h1 style="font-family: 'Montserrat' !important; text-align: center; margin:2px; font-size: 52px">${storageVersion}</h1>
        <b style="font-family: 'Montserrat' !important; margin-left:16px;">Изменения:</b>
        <ul style="margin-left:12px;">
            <li style="font-family: 'Montserrat' !important;">Все написано с нуля</li>
            <li style="font-family: 'Montserrat' !important;">Новый дизайн</li>
            <li style="font-family: 'Montserrat' !important;">Удобная навигация</li>
            <li style="font-family: 'Montserrat' !important;">Много оптимизации</li>
        </ul>
        <p style="margin-left:22px;margin-right:22px;">
            <b style="font-family: 'Montserrat' !important;">Переустановите приложение, чтобы избежать ошибок! </b>
            <a href="/college${betaRepos}/support/?q=reinstall" style="font-family: 'Montserrat' !important; text-decoration: underline 2px solid var(--root-text-color);">Как это сделать?</a>
        </p>
        <div style="display: flex; justify-content: center;">
            <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="deviceStorage('write', 'noDisplayUpdate30', 'true'); document.getElementById('modal').innerHTML = ''; theme.load()">Больше не показывать</button>
        </div>
    </div>
    `) 
}

deviceStorage('write', 'storageJSBuild', storageBuild); theme.load(); enableLogger()
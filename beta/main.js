/*       -------         Main file         -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

/* 
    This file using for main functions for site
*/

var mainBuild = 73

/* Logging and display if that version (variable BETA) is beta */
if (BETA) {

    document.getElementById('csc11-title-of-page').innerHTML = 'Beta version'

    console.log(`
    Перед выходом в релиз:
        • Все файлы .html: поменять директории файлов на релиз
        • preload.js: переменная BETA
        
    Чтобы получить модальное окно дебага, введите команду: frames.debugModal() или перейдите по ссылке: ${window.location.href.charAt(window.location.href.length - 1) == '/' ? `${window.location.href}?debug=true` : `${window.location.href}&debug=true`}
    `)

}

/* Display current builds of this site */
console.log(`Current builds (version ${siteVersion}):
    Preload JS:  build ${deviceStorage.get('preloadJSBuild')};
    Frames JS:   build ${deviceStorage.get('framesJSBuild')};
    Main JS:     build ${deviceStorage.get('mainJSBuild')};
    Timeable JS: build ${deviceStorage.get('timetableJSBuild')};
    Home:        build ${deviceStorage.get('homeBuildPage')};
    Other:       build ${deviceStorage.get('otherBuildPage')};
    Gtable:      build ${deviceStorage.get('gtableBuildPage')};
    Simple:      build ${deviceStorage.get('simpleBuildPage')};
    Settings:    build ${deviceStorage.get('settingsBuildPage')};
    Support:     build ${deviceStorage.get('supportBuildPage')}
`);

/**
 *  Work with theme in site (style id "root-colors-theme" need)
 *      
 *      theme.prepare() returned current theme in bool format (true - dark theme, false - light theme)
 *      theme.load() loaded theme (used in storage.js and in modals)
 *      theme.change() changed theme to reverse and load theme again
 *      theme.gtable() special onle gtable page (set light theme and remove load gif)
 * 
 */
var theme = {
    prepare: function() {

        if (deviceStorage.check('themeType3Time') && deviceStorage.get('themeType') == 3)
            { console.warn('Warning: script found inconsistency in localStorage and fixes it'); deviceStorage.write('themeType', 1) }

        if (deviceStorage.check('themeType'))
            { console.warn('Warning: theme type is undefined, set to default'); deviceStorage.write('themeType', 1) }

        if (deviceStorage.check('theme'))
            { console.warn('Warning: theme is undefined, set theme to light'); deviceStorage.write('theme', 'light') }

        if (deviceStorage.get('theme') != 'light' && deviceStorage.get('theme') != 'dark')
            { console.warn('Warning: theme is incorrect, set theme to light'); deviceStorage.write('theme', 'light') }

        if (deviceStorage.check('themeEnableThemeButton'))
            { console.warn('Warning: theme button is undefined, turned it on'); deviceStorage.write('themeEnableThemeButton', true) }

        if (deviceStorage.get('themeType') == 2 || deviceStorage.get('themeType') == 3)
            { deviceStorage.write('themeEnableThemeButton', false) }

        try {
            var onDateSunriseSunset = SunCalc.getTimes(CURRDATE, 64.4, 40.4)
            if (deviceStorage.get('themeType') == 2) { 
                if (onDateSunriseSunset.sunrise < CURRDATE && CURRDATE < onDateSunriseSunset.sunset) { deviceStorage.write('theme', 'light') } 
                else                                                                                 { deviceStorage.write('theme', 'dark') } 
            }
            /*
            if (deviceStorage.get('themeType') == 3) {
                var themeTimeNow = parseInt(String(CURRDATE.getHours()) + (CURRDATE.getMinutes() < 10 ? '0' + String(CURRDATE.getMinutes()) : String(CURRDATE.getMinutes()))) 
                var themeTimeFrom = parseInt(deviceStorage.get('themeType3Time').charAt(0) + deviceStorage.get('themeType3Time').charAt(1) + deviceStorage.get('themeType3Time').charAt(3) + deviceStorage.get('themeType3Time').charAt(4)); 
                var themeTimeTo = parseInt(deviceStorage.get('themeType3Time').charAt(5) + deviceStorage.get('themeType3Time').charAt(6) + deviceStorage.get('themeType3Time').charAt(8) + deviceStorage.get('themeType3Time').charAt(9));
                if (themeTimeFrom < themeTimeTo) {
                    if (themeTimeFrom < themeTimeNow && themeTimeNow < themeTimeTo)                                              { deviceStorage.write('theme', 'light') } 
                    else                                                                                                         { deviceStorage.write('theme', 'dark') } 
                }
                else if (themeTimeFrom > themeTimeTo) {
                    if ((themeTimeFrom < themeTimeNow && themeTimeNow < 23) || (0 < themeTimeNow && themeTimeNow < themeTimeTo)) { deviceStorage.write('theme', 'light') } 
                    else                                                                                                         { deviceStorage.write('theme', 'dark') } 
                }
            }
            */
        } catch (e) { page.critical(`Error: theme function prepare (${e})`) }
        if (deviceStorage.get('theme') == 'light') { return false }
        if (deviceStorage.get('theme') == 'dark')  { return true }
    },

    change: async function() {
          if (theme.prepare()) { deviceStorage.write('theme', 'light'); theme.load() }
        else                   { deviceStorage.write('theme', 'dark'); theme.load() }
    }, 

    load: async function() {
          if (theme.prepare()) { page.output('root-colors-theme', `${THEME.dark} #thMoon { display: none; }`); await page.sleep(65); document.getElementById('theme-color').content = '#181818' }
        else                   { page.output('root-colors-theme', `${THEME.light} #thSun { display: none; }`); await page.sleep(65); document.getElementById('theme-color').content = '#e9e9e9' }
    },

    gtable: async function() {
        page.output('root-colors-theme', `${THEME.light} #thSun { display: none; }`)
        await page.sleep(70)
        document.getElementById('theme-color').content = '#ffffff'
        await page.sleep(5000)
        page.output('loadText', '')
    }

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
                    page.error(`Error: ServiceWorker registration failed: ${e}`)
                }
            ).catch(function(e) { page.error(`Error: ServiceWorker function (${e})`) })
        })
    }
    else { console.warn('Warning: Service worker is not supported') }
}

if (REQUEST.debug) { frames.debugModal() }

deviceStorage.write('mainJSBuild', mainBuild); theme.load(); enableLogger()
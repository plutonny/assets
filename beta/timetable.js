/*       -------      Timetable file      -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var timetableBuild = 1;

/**
 *  Example of timetble:
 * 
 *      day: [
 *          [num of pair, name of pair, teacher of pair, cabinet of pair, type (yellow, green or default) of pair],
 *          ...
 *          []
 *      ]
 * 
 */
var TIMETABLE = {
    1: [ /* monday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    2: [ /* tuesday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    3: [ /* wednesday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    4: [ /* thursday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    5: [ /* friday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    6: [ /* saturday */
        ['1', 'Математика', 'Панфилова', '406', 'default'],
        ['2', 'Русский', 'Гобова', '404', 'yellow'],
        ['2', 'Литеатура', 'Гобова', '404', 'green'],
        ['3', 'Физика', 'Момотов', '300', 'default'],
    ],
    alerts: {
        1: [[830, 915], [920, 1005]],
        2: [[1015, 1100], [1105, 1150]],
        3: [[1235, 1320], [1325, 1410]],
        4: [[1420, 1505], [1510, 1555]],
        5: [[1605, 1650], [1655, 1740]]
    }
}

function pairGet(type) {
    var timeNow = parseInt(String(CURRDATE.getHours()) + String(CURRDATE.getMinutes()))

    if (type == 'timeCurrent') {
        /* 1 pair */
        if (parseInt(TIMETABLE[CURRDATE.getDay()][TIMETABLE[CURRDATE.getDay()].length - 1][0]) >= 1) {
                 if (TIMETABLE.alerts[1][0][0] <= timeNow && timeNow <= TIMETABLE.alerts[1][0][1]) { return 'Сейчас 1-я пара' }
            else if (TIMETABLE.alerts[1][0][1] <= timeNow && timeNow <= TIMETABLE.alerts[1][1][0]) { return 'Сейчас пятиминутка' }
            else if (TIMETABLE.alerts[1][1][0] <= timeNow && timeNow <= TIMETABLE.alerts[1][1][1]) { return 'Сейчас 1-я пара' }
        }
        /* 2 pair */
        if (parseInt(TIMETABLE[CURRDATE.getDay()][TIMETABLE[CURRDATE.getDay()].length - 1][0]) >= 2) {
                 if (TIMETABLE.alerts[2][0][0] <= timeNow && timeNow <= TIMETABLE.alerts[2][0][1]) { return 'Сейчас 2-я пара' }
            else if (TIMETABLE.alerts[2][0][1] <= timeNow && timeNow <= TIMETABLE.alerts[2][1][0]) { return 'Сейчас пятиминутка' }
            else if (TIMETABLE.alerts[2][1][0] <= timeNow && timeNow <= TIMETABLE.alerts[2][1][1]) { return 'Сейчас 2-я пара' }
        }
        /* 3 pair */
        if (parseInt(TIMETABLE[CURRDATE.getDay()][TIMETABLE[CURRDATE.getDay()].length - 1][0]) >= 3) {
                 if (TIMETABLE.alerts[2][1][1] <= timeNow && timeNow <= TIMETABLE.alerts[3][0][0]) { return 'Сейчас перерыв' }
            else if (TIMETABLE.alerts[3][0][0] <= timeNow && timeNow <= TIMETABLE.alerts[3][0][1]) { return 'Сейчас 3-я пара' }
            else if (TIMETABLE.alerts[3][0][1] <= timeNow && timeNow <= TIMETABLE.alerts[3][1][0]) { return 'Сейчас пятиминутка' }
            else if (TIMETABLE.alerts[3][1][0] <= timeNow && timeNow <= TIMETABLE.alerts[3][1][1]) { return 'Сейчас 3-я пара' }
        }
        /* 4 pair */
        if (parseInt(TIMETABLE[CURRDATE.getDay()][TIMETABLE[CURRDATE.getDay()].length - 1][0]) >= 4) {
                 if (TIMETABLE.alerts[4][0][0] <= timeNow && timeNow <= TIMETABLE.alerts[4][0][1]) { return 'Сейчас 4-я пара' }
            else if (TIMETABLE.alerts[4][0][1] <= timeNow && timeNow <= TIMETABLE.alerts[4][1][0]) { return 'Сейчас пятиминутка' }
            else if (TIMETABLE.alerts[4][1][0] <= timeNow && timeNow <= TIMETABLE.alerts[4][1][1]) { return 'Сейчас 4-я пара' }
        }
        /* 5 pair */
        if (parseInt(TIMETABLE[CURRDATE.getDay()][TIMETABLE[CURRDATE.getDay()].length - 1][0]) >= 5) {
                 if (TIMETABLE.alerts[5][0][0] <= timeNow && timeNow <= TIMETABLE.alerts[5][0][1]) { return 'Сейчас 5-я пара' }
            else if (TIMETABLE.alerts[5][0][1] <= timeNow && timeNow <= TIMETABLE.alerts[5][1][0]) { return 'Сейчас пятиминутка' }
            else if (TIMETABLE.alerts[5][1][0] <= timeNow && timeNow <= TIMETABLE.alerts[5][1][1]) { return 'Сейчас 5-я пара' }
        }
        return 'Пары закончились'
    }
}

deviceStorage('write', 'timetableJSBuild', timetableBuild)
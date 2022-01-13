/*       -------      Timetable file      -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var timetableBuild = 4;

/**
 *  Example of timetble:
 * 
 *      day: [
 *          [num, name, teacher, cabinet, type (yellow, green or default)],
 *          *count of pairs in day*
 *      ]
 * 
 */
var TIMETABLE = {
    0: [
        ['0', 'Error', 'Error', '0', 'default']
    ],
    1: [ /* monday */
        ['1', 'ОБЖ', 'Грициенко', 'к. 314', 'default'],
        ['2', 'Физкультура', 'Топорков', '0100', 'default'],
        ['3', 'Физика', 'Момотов', 'л. 300', 'default']
    ],
    2: [ /* tuesday */
        ['1', 'Физика', 'Момотов', 'л. 300', 'yellow'],
        ['1', 'Литература', 'Горбова', 'к. 404', 'green'],
        ['2', 'Родная литература', 'Новикова', 'к. 413', 'yellow'],
        ['2', 'Астрономия', 'Вититнев', 'л. 300', 'green'],
        ['3', 'Информатика', 'Цыганкова', 'лр', 'default']
    ],
    3: [ /* wednesday */
        ['1', 'Математика', 'Панфилова', 'к. 406', 'default'],
        ['2', 'Литература', 'Горбова', 'к. 404', 'default'],
        ['3', 'Английский язык', 'Венедиктова, Черкасова', 'к. 404а/311', 'yellow'],
        ['3', 'Физкультура', 'Топорков', '0100', 'green']
    ],
    4: [ /* thursday */
        ['1', 'Информатика', 'Цыганкова', 'к. 220', 'default'],
        ['2', 'Русский', 'Горбова', 'к. 404', 'default'],
        ['3', 'Математика', 'Панфилова', 'к. 406', 'default']
    ],
    5: [ /* friday */
        ['1', 'Физика', 'Момотов, Якуня', 'л. 300', 'yellow'],
        ['1', 'Физика', 'Момотов', 'л. 300', 'green'],
        ['2', 'Математика', 'Панфилова', 'к. 406', 'default'],
        ['3', 'Индив. проект', 'Солодкая', 'к. 226', 'yellow'],
        ['3', 'Индив. проект', 'Солодкая', 'чит. зал', 'green']
    ],
    6: [ /* saturday */
        ['1', 'Английский язык', 'Венедиктова, Черкасова', 'к. 404а/311', 'default'],
        ['2', 'История', 'Глущенко', 'к. 407', 'default'],
        ['3', 'Химия', 'Петрова', 'л. 402', 'default'],
    ],
    alerts: {
        1: [[830, 915], [920, 1005]],
        2: [[1015, 1100], [1105, 1150]],
        3: [[1235, 1320], [1325, 1410]],
        4: [[1420, 1505], [1510, 1555]],
        5: [[1605, 1650], [1655, 1740]]
    }
}

/**
 *  Work with timetable
 *
 *      "type" - timeCurrent (return current pair) or pairOfDay (return list of pairs on this day)
 *      "data" - secondary varable (in pairOfDay is day of week)
 * 
 */
function pairGet(type, data) {
    var timeNow = parseInt(String(CURRDATE.getHours()) + String(CURRDATE.getMinutes()))

    if (type == 'timeCurrent') {
        if (timeNow <= TIMETABLE.alerts[1][0][0]) { return 'Пары скоро начнутся' }
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

    if (type == 'pairOfDay') {
        var result = []

        if (data != 0) {
            for (let i = 0; i < TIMETABLE[data].length; i++) {
                if (TIMETABLE[data][i][4] == weekNameEN || TIMETABLE[data][i][4] == 'default') { result.push(TIMETABLE[data][i]) }
            }
        } else { return false }

        return result
    }
}

function pairHTML(pairList) {
    var result = '', inj = ''
    for (var i = 0; i < pairList.length; i++) {
        if (pairList[i][4] == 'default') { inj = '--root-button-color' }
        else { inj = `--week-${weekNameEN}` }
        result += `
            <div style="background-color: var(${inj}); height: 46px; padding: 10px; margin: 16px 0px; border-radius: 16px;">
                <div style="display: flex;">
                    <p style="margin: 0; font-size: 18px;">${pairList[i][0]}. ${pairList[i][1]}</p>
                    <div style="margin-right: auto;"></div>
                    <p style="margin: 0px 4px 0px 0px; font-size: 14px;">${pairList[i][3]}</p>
                </div>
                <p style="margin: 0px 0px 0px 20px; font-size: 14px;">${pairList[i][2]}</p>
            </div>
        `
    }
    return result
}

deviceStorage('write', 'timetableJSBuild', timetableBuild)
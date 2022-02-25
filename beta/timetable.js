/*       -------      Timetable file      -------       */
/*     -------       Made by plutonny       -------     */

"use strict";

var timetableBuild = 13

var timeNow = parseInt(String(CURRDATE.getHours()) + (CURRDATE.getMinutes() < 10 ? '0' + String(CURRDATE.getMinutes()) : String(CURRDATE.getMinutes())))

/**
 *  Tree of TIMETABLE:
 * 
 *      TIMETABLE: {
 *          day: [ *count days (6)*
 *              [num, name, teacher, cabinet, type (yellow, green or default)],
 *              ADVICE: if color of pair is not default, first is yellow, then green
 *              *count of pairs in day*
 *          ],
 *          alerts: { 1-5: [[int, int], [int, int]] },
 *          pair: {
 *              get: {
 *                  current() - returned current pair (first, second etc),
 *                  listOfDay(data) - data: [current day, week color] - returned list of pairs on day with week color,
 *                  HTML: {
 *                      day(pairList) - returned HTML pairs of day,
 *                      week() - returned HTML pairs of week
 *                  }
 *              }
 *          },
 *          weekChanger(day) - (only week table) visible or hidden week tables (output used - need tag id 'timetableWeekName' and 'timetableCSS')
 *      }
 * 
 */
var TIMETABLE = {
    0: [
        ['0', 'Error',             'Error',                  '0',        'default']
    ],
    1: [ /* monday */
        ['1', 'ОБЖ',               'Грициенко',              '314',      'default'],
        ['2', 'Физкультура',       'Топорков',               '0100',     'default'],
        ['3', 'Физика',            'Момотов',                '300',      'default']
    ],
    2: [ /* tuesday */
        ['1', 'Физика',            'Момотов',                '300',      'yellow'],
        ['1', 'Литература',        'Горбова',                '404',      'green'],
        ['2', 'Родная литература', 'Новикова',               '413',      'yellow'],
        ['2', 'Астрономия',        'Вититнев',               '300',      'green'],
        ['3', 'Информатика',       'Цыганкова',              'лр',       'default']
    ],
    3: [ /* wednesday */
        ['1', 'Математика',        'Панфилова',              '406',      'default'],
        ['2', 'Литература',        'Горбова',                '404',      'default'],
        ['3', 'Английский язык',   'Венедиктова, Черкасова', '404а/311', 'yellow'],
        ['3', 'Физкультура',       'Топорков',               '0100',     'green']
    ],
    4: [ /* thursday */
        ['1', 'Информатика',       'Цыганкова',              '220',      'default'],
        ['2', 'Русский',           'Горбова',                '404',      'default'],
        ['3', 'Математика',        'Панфилова',              '406',      'default']
    ],
    5: [ /* friday */
        ['1', 'Физика',            'Момотов, Якуня',         '300',      'yellow'],
        ['1', 'Физика',            'Момотов',                '300',      'green'],
        ['2', 'Математика',        'Панфилова',              '406',      'default'],
        ['3', 'Индив. проект',     'Солодкая',               '226',      'yellow'],
        ['3', 'Индив. проект',     'Солодкая',               'чит. зал', 'green']
    ],
    6: [ /* saturday */
        ['1', 'Английский язык',   'Венедиктова, Черкасова', '404а/311', 'default'],
        ['2', 'История',           'Глущенко',               '407',      'default'],
        ['3', 'Химия',             'Петрова',                '402',      'default'],
    ],
    alerts: {
        1: [[ 830,  915], [ 920, 1005]],
        2: [[1015, 1100], [1105, 1150]],
        3: [[1235, 1320], [1325, 1410]],
        4: [[1420, 1505], [1510, 1555]],
        5: [[1605, 1650], [1655, 1740]]
    },
    pair: {
        get: {
            current: function() {
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
            },
            listOfDay: function(data) {
                var result = []

                if (data[0] != 0) {
                    for (let i = 0; i < TIMETABLE[data[0]].length; i++) {
                        if (TIMETABLE[data[0]][i][4] == data[1] || TIMETABLE[data[0]][i][4] == 'default') { result.push(TIMETABLE[data[0]][i]) }
                    }
                } else { return false }

                return result
            },
            HTML: {
                day: function(pairList) {
                    var result = '', inj = ''
                    for (var i = 0; i < pairList.length; i++) {
                        if (pairList[i][4] == 'default') { inj = '--root-button-color' }
                        else { inj = `--week-${WEEK.name.EN}` }
                        result += `
                            <div style="background-color: var(${inj}); height: 46px; padding: 10px; margin: 16px 0px; border-radius: 16px;">
                                <div style="display: flex;">
                                    <p style="margin: 0px 0px 0px 4px; font-size: 18px;">${pairList[i][0]}.<b style="margin: 0px 0px 0px 4px; font-size: 18px; font-family: 'Montserrat';">${pairList[i][1]}</b></p>
                                    <div style="margin-right: auto;"></div>
                                    <p style="margin: 0px 4px 0px 0px; font-size: 14px;">${pairList[i][3]}</p>
                                </div>
                                <b style="margin: 0px 0px 0px 24px; font-size: 14px; font-family: 'Montserrat';">${pairList[i][2]}</b>
                            </div>
                        `
                    }
                    return result
                },
                week: function() {
                    var result = `
                    <style>
                        td.timetableTableWeek { border: 1px solid #707070; height: 32px; padding: 0px 2px; font-family: 'Montserrat'; }
                    </style>
                    `
                    for (var i = 1; i <= 6; i++) {
                        result += `<table class="timetableWork${i}" style="border: 1px solid #707070; border-radius: 18px; width: 330px; text-align: center; border-collapse: separate; border-spacing: 0px; margin: auto; background-color: var(--root-navbar-bg-color);">`
                        for (var j = 0; j < TIMETABLE[i].length; j++) {
                            var inj = { 
                                color: TIMETABLE[i][j][4] == 'default' ? `--root-navbar-bg-color` : `--week-${TIMETABLE[i][j][4]}`,
                                border: {
                                    left: {
                                        top:    j == 0 ?                       'border-top-left-radius: 17px'     : '',
                                        bottom: j == TIMETABLE[i].length - 1 ? 'border-bottom-left-radius: 17px'  : ''
                                    },
                                    right: {
                                        top:    j == 0 ?                       'border-top-right-radius: 17px'    : '',
                                        bottom: j == TIMETABLE[i].length - 1 ? 'border-bottom-right-radius: 17px' : ''
                                    }
                                }
                            }
                            if (TIMETABLE[i][j][4] == 'default') {
                                result += `
                                <tr style="background-color: var(${inj.color});">
                                    <td rowspan="2" style="width: 16px; border: 1px solid #707070; ${inj.border.left.top}${inj.border.left.bottom}"><b>${TIMETABLE[i][j][0]}</b></td>
                                    <td style="width: 220px;" class="timetableTableWeek"><b style="font-family: 'Montserrat';">
                                        ${TIMETABLE[i][j][1]}
                                    </b></td>
                                    <td class="timetableTableWeek" style="${inj.border.right.top}">
                                        ${TIMETABLE[i][j][3]}
                                    </td>
                                </tr>
                                <tr style="background-color: var(${inj.color});">
                                    <!-- Here <td> of num of pair -->
                                    <td style="width: 220px;" class="timetableTableWeek">
                                        ${TIMETABLE[i][j][2]}
                                    </td>
                                    <td class="timetableTableWeek" style="${inj.border.right.bottom}"></td>
                                </tr>
                                `
                            } else {
                                if (j + 1 == TIMETABLE[i].length - 1) { var injLeftBottom = 'border-bottom-left-radius: 17px', injRightBottom = 'border-bottom-right-radius: 17px' }
                                else { var injLeftBottom = '', injRightBottom = '' }
                                result += `
                                <tr style="background-color: var(--week-${TIMETABLE[i][j][4]});">
                                    <td rowspan="2" style=" background-color: var(--root-navbar-bg-color); width: 16px; border: 1px solid #707070; ${inj.border.left.top}${injLeftBottom}"><b>${TIMETABLE[i][j][0]}</b></td>
                                    <td style="width: 220px; font-family: 'Montserrat';" class="timetableTableWeek">
                                        ${TIMETABLE[i][j][4] == WEEK.name.EN ? `<b style="font-family: 'Montserrat';">` : ''}${TIMETABLE[i][j][1]}${TIMETABLE[i][j][4] == WEEK.name.EN ? `</b>` : ''}
                                    </td>
                                    <td class="timetableTableWeek" style="${inj.border.right.top}">
                                        ${TIMETABLE[i][j][3]}
                                    </td>
                                </tr>
                                <tr style="background-color: var(--week-${TIMETABLE[i][j + 1][4]});">
                                    <!-- Here <td> of num of pair -->
                                    <td style="width: 220px; font-family: 'Montserrat';" class="timetableTableWeek">
                                        ${TIMETABLE[i][j + 1][4] == WEEK.name.EN ? `<b style="font-family: 'Montserrat';">` : ''}${TIMETABLE[i][j + 1][1]}${TIMETABLE[i][j + 1][4] == WEEK.name.EN ? `</b>` : ''}
                                    </td>
                                    <td class="timetableTableWeek" style="${injRightBottom}">
                                        ${TIMETABLE[i][j + 1][3]}
                                    </td>
                                </tr>
                                `
                                j++
                            }
                        }
                        result += `</table>`
                    }

                    return result
                }
            }
        },
        weekChanger: function(day) {
            var result = '', weekNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
            var j
            if (day == 0) { j = 1 }
            else { j = day }

            for (var i = 1; i <= 6; i++) {
                if (i == j) { result += `.timetableWorkButton${i} { background-color: var(--active-button-color) }` }
                else        { result += `.timetableWork${i} { display: none }` }
            }

            page.output('timetableWeekName', `${CURRDATE.getDay() == 0 ? `С пон-ка ${WEEK.name.alt.RU}` : capitalize(WEEK.name.RU)} неделя, ${weekNames[j]}:`) 
            page.output('timetableCSS', result) 
        }
    }
}

deviceStorage.write('timetableJSBuild', timetableBuild)
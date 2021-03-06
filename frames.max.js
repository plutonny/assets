/*       -------        Frames file        -------      */
/*     -------       Made by plutonny       -------     */

"use strict";

/* 
    This file using for storage any HTML functions and modules
*/

var framesBuild = 7

/* Theme variable: light and dark color palette for theme function */

if (deviceStorage.check('acbgcolor'))
    { console.warn('Warning: accent second color is undefined, set to default'); deviceStorage.write('acbgcolor', 'default') }

if (!(deviceStorage.get('acbgcolor') == 'default' || deviceStorage.get('acbgcolor') == 'weekcolor'))
    { console.warn('Warning: accent second color is uncorrect, set to default'); deviceStorage.write('acbgcolor', 'default') }

if (deviceStorage.check('worknavbar'))
    { console.warn('Warning: navbar type is undefined, set to float'); deviceStorage.write('worknavbar', 'float') }

if (!(deviceStorage.get('worknavbar') == 'default' || deviceStorage.get('worknavbar') == 'float'))
    { console.warn('Warning: navbar type is uncorrect, set to float'); deviceStorage.write('worknavbar', 'float') }

var THEME = {
    light: `:root {
            --root-text-color      :#101520;
            --active-text-color    :#353535;
            --primary-bg-color     :linear-gradient(#e9e9e9, ${deviceStorage.get('acbgcolor') == 'default' ? '#cccccc' : ''}${deviceStorage.get('acbgcolor') == 'weekcolor' ? 'var(--week-color)' : ''});
            --secondary-bg-color   :#f5f5f5;
            --root-button-color    :#dddddd;
            --hover-button-color   :#d2d2d2;
            --active-button-color  :#c0c0c0;
            --root-navbar-bg-color :#ebebeb;
            --navbar-box-color     :#aaaaaa;
            --root-icon-color      :#909090;
            --week-green           :#7cf779;
            --week-yellow          :#f3ee67;
            --week-color           :var(--week-${WEEK.name.EN}) !important;
        }`,
    dark: `:root {
            --root-text-color      :#f4f4f4;
            --active-text-color    :#a9a9a9;
            --primary-bg-color     :linear-gradient(#181818, ${deviceStorage.get('acbgcolor') == 'default' ? '#404040' : ''}${deviceStorage.get('acbgcolor') == 'weekcolor' ? 'var(--week-color)' : ''});
            --secondary-bg-color   :#000000;
            --root-button-color    :#303030;
            --hover-button-color   :#3a3a3a;
            --active-button-color  :#454545;
            --root-navbar-bg-color :#111111;
            --navbar-box-color     :#080808;
            --root-icon-color      :#707070;
            --week-green           :#114110;
            --week-yellow          :#454306;
            --week-color           :var(--week-${WEEK.name.EN}) !important;
        }`
}

/* Storage SVG icons */
var SVG = {

    /* header icons */
    theme    :`<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thMoon">
                 <rect fill="none" height="20" width="20"/>
                 <path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z"/>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 20 20" width="32px" id="thSun">
                 <rect fill="none" height="20" width="20"/>
                 <path d="M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z"/>
               </svg>`,
    back     :`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="32px" viewBox="0 0 24 24" width="32px">
                 <rect fill="none" height="24" width="24"/>
                 <g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"/></g>
               </svg>`,

    /* navbar icons */
    home     :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
               </svg>`,
    calendar :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
               </svg>`,
    done     :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M18 9l-1.41-1.42L10 14.17l-2.59-2.58L6 13l4 4zm1-6h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/>
               </svg>`,
    other    :`<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
               </svg>`,

    /* other icons */
    settings :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
               </svg>`,
    support  :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
               </svg>`,
    list     :`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="28px" viewBox="0 0 24 24" width="28px">
                 <rect fill="none" height="24" width="24"/>
                 <path d="M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z"/>
               </svg>`,
    link     :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
               </svg>`,
    discord  :`<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 71 55">
                 <g clip-path="url(#clip0)"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/></g>
                 <defs><clipPath id="clip0"><rect width="71" height="55" fill="white"/></clipPath></defs>
               </svg>`,
    people   :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"/>
               </svg>`,
    simple   :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M3 12c0 2.21.91 4.2 2.36 5.64L3 20h6v-6l-2.24 2.24C5.68 15.15 5 13.66 5 12c0-2.61 1.67-4.83 4-5.65V4.26C5.55 5.15 3 8.27 3 12zm8 5h2v-2h-2v2zM21 4h-6v6l2.24-2.24C18.32 8.85 19 10.34 19 12c0 2.61-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74 0-2.21-.91-4.2-2.36-5.64L21 4zm-10 9h2V7h-2v6z"/>
               </svg>`,
    email    :`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px">
                 <path d="M0 0h24v24H0V0z" fill="none"/>
                 <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
               </svg>`,
    oldver   :`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="28px" viewBox="0 0 24 24" width="24px">
                 <g><path d="M0,0h24v24H0V0z" fill="none"/></g>
                 <g><g><path d="M6,13c0-1.65,0.67-3.15,1.76-4.24L6.34,7.34C4.9,8.79,4,10.79,4,13c0,4.08,3.05,7.44,7,7.93v-2.02 C8.17,18.43,6,15.97,6,13z M20,13c0-4.42-3.58-8-8-8c-0.06,0-0.12,0.01-0.18,0.01l1.09-1.09L11.5,2.5L8,6l3.5,3.5l1.41-1.41 l-1.08-1.08C11.89,7.01,11.95,7,12,7c3.31,0,6,2.69,6,6c0,2.97-2.17,5.43-5,5.91v2.02C16.95,20.44,20,17.08,20,13z"/></g></g>
               </svg>`
}

var frames = {
    /* Delete localStorage (modal window) */
    deleteLocalStorage: function() {
        modal(`
        <div style="max-height: 95%; overflow-y: auto; background-color: var(--secondary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
            <h1 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px;">????????????????</h1>
            <p style="font-family: 'Montserrat' !important; text-align: center;">???? ?????????????</p>
            <div style="display: flex; justify-content: center;">
                <button style="cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 128px; margin: 4px 16px 16px 16px; background-color: #00ff0020;" onclick="frames.debugModal()">??????</button>
                <button style="cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 128px; margin: 4px 16px 16px 16px; background-color: #ff000020;" onclick="localStorage.clear(); document.getElementById('modal').innerHTML = ''; theme.load()">????</button>
            </div>
        </div>
        `) 
    },

    /* Debug modal window */
    debugModal: function() {
        var inj = '', localStorageKeys = ''

        for (var i = 0; i < localStorage.length; i++) { 
            localStorageKeys += `
            <div style="width: fit-content; margin: 8px; padding: 8px; background-color: var(--root-button-color); box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 16px;">
                <p style="margin: 0; text-align: center;">${localStorage.key(i)} - ${localStorage.getItem(localStorage.key(i))}</p>
                <div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: center;">
                    <input style="padding-left: 6px; color: var(--root-text-color); border: none; box-shadow: 0px 0px 8px var(--navbar-box-color); border-radius: 10px; background-color: #00000055; height: 30px; width: 128px; margin: 4px;" autocomplete="off" type="text" id="lssedit${i}" class="debug_lssedit${i}">
                    <script>lssedit${i}.oninput = async function() { deviceStorage.write("${localStorage.key(i)}", lssedit${i}.value);}</script>
                    <button style="width: 64px; margin: 4px; background-color: #ff000055;" onclick="deviceStorage.remove('${localStorage.key(i)}')">delete</button>
                </div>
            </div>`
        }

        inj += `<div style="max-height: 98%; overflow-y: auto; margin-right: 2%; margin-left: 2%; padding-right: 12px; padding-left: 12px; background-color: var(--secondary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
                    <style>
                        button:not(.back_button) { border-radius: 10px; border: none; box-shadow: 0px 0px 8px var(--navbar-box-color); height: 32px; width: 128px; cursor: pointer; }
                    </style>
                    <h1 style="text-align: center;">Debug modal:</h1>
                    <button style="width: 100%; height: 64px; font-size: 24px; border-radius: 16px;" onclick="theme.change()">?????????????? ????????</button>
                    <h2 style="text-align: center;">Error</h2>
                    <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly; align-items: center;">
                        <button style="margin: 4px; background-color: #ff000055;" onclick="page.error('Error: debug.js is calling')">default</button>
                        <button style="margin: 4px; background-color: #00000055;" onclick="page.critical('Critical: debug.js is calling')">critical</button>
                    </div>
                    <h1 style="text-align: center;">localStorage:</h1>
                    <div style="display: flex; flex-direction: row; flex-wrap: wrap; align-content: center; justify-content: space-evenly; align-items: center;">
                        ${localStorageKeys}
                    </div>
                    <button style="margin: 32px 0px; width: 100%; height: 64px; font-size: 24px; border-radius: 16px; background-color: #ff000055;" onclick="frames.deleteLocalStorage()">DELETE ALL</button>

                    <div style="display:flex;justify-content:center;">
                        <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="document.getElementById('modal').innerHTML = ''; theme.load()">??????????????</button>
                    </div>
                </div>`

        modal(inj)
    },

    /**
     *  Outputted navbar (div id "navbar" need)
     * 
     *      navbarActive - current opened page (home, other, grades, attendance)
     * 
     */
    navbar: function(navbarActive) {
        var inj = ''
        if (deviceStorage.get('worknavbar') == 'float') {
            inj += `
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
            `
        }
        else if (deviceStorage.get('worknavbar') == 'default') {
            inj += `
            <style>
                .navbar {
                    z-index: 10;
                    padding: 6px;
                    position: fixed;
                    height: 54px;
                    background-color: var(--root-navbar-bg-color);
                    top: calc(100% - 66px);
                    width: calc(100% - 12px);
                    box-shadow: 0px 0px 8px var(--navbar-box-color);
                }

                .iconNavbar {
                    padding: 1px 16px;
                    border-radius: 100px;
                }

                .buttonsNavbar {
                    height: 100%;
                    align-items: center;
                }

                .${navbarActive}Navbar { color: var(--root-text-color) !important; }
                .${navbarActive}Icon { background-color: var(--week-color); }

            </style>
            `
        }
        page.output('navbar', `
            ${inj}
            
            <div class="buttonsNavbar" style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;">
                <div style="width: 20%">
                    <a style="text-decoration: none;" href="/college${betaRepos}/">
                        <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                            <p class="homeNavbar homeIcon iconNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.home}</p>
                            <p class="homeNavbar" style="color: #707070; margin: 0; font-size: 14px;">??????????????</p>
                        </div>
                    </a>
                </div>
                <div style="width: 20%">
                    <a style="text-decoration: none;" href="/college${betaRepos}/gtable/?pres=grades">
                        <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                            <p class="gradesNavbar gradesIcon iconNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.done}</p>
                            <p class="gradesNavbar" style="color: #707070; margin: 0; font-size: 14px;">????????????</p>
                        </div>
                    </a>
                </div>
                <div style="width: 20%">
                    <a style="text-decoration: none;" href="/college${betaRepos}/gtable/?pres=attendance">
                        <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                            <p class="attendanceNavbar attendanceIcon iconNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.calendar}</p>
                            <p class="attendanceNavbar" style="color: #707070; margin: 0; font-size: 14px;">????????</p>
                        </div>
                    </a>
                </div>
                <div style="width: 20%">
                    <a style="text-decoration: none;" href="/college${betaRepos}/other/">
                        <div style="display: flex; flex-direction: column; flex-wrap: nowrap; align-items: center;">
                            <p class="otherNavbar otherIcon iconNavbar" style="color: #707070; fill: currentColor; margin: 0; height: 26px;">${SVG.other}</p>
                            <p class="otherNavbar" style="color: #707070; margin: 0; font-size: 14px;">????????????</p>
                        </div>
                    </a>
                </div>
            </div>
        `);
    },

    /**
     *  Outputted header (div id "header" need)
     * 
     *      headerText     - text in header
     *      buttons        - [(bool), (bool)] enable or disable theme button [0] and back button [1]
     *      hrEnable       - (bool) enable or disable hr (line) after header
     * 
     */
    header: function(headerText, buttons, hrEnable) {
        try {

            var inj = '';

            if (buttons[0] && deviceStorage.get('themeEnableThemeButton') == 'true' && deviceStorage.get('themeType') == 1) {
                inj += `<button 
                            class="theme_button" 
                            style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; left: 100%; position: absolute; margin: 14px 0px 0px -52px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: transparent;" 
                            onclick="theme.change()">
                                ${SVG.theme}
                        </button>`
            }

            if (buttons[1]) {
                inj += `<button 
                            class="back_button" 
                            style="height: 38px; width: 38px; z-index: 90; border: none !important; fill: currentColor; position: absolute; margin-left: 8px; margin-top: 14px; border-radius: 100px; cursor: pointer; padding: 2px 3px 0px 3px; background-color: transparent;" 
                            onclick="history.back()">
                                ${SVG.back}
                        </button>`
            }

            page.output(`header`, `
                <div class="hdr">
                    <style>.hdr { padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none; }</style>
                    <div style="margin-right: auto;"></div>
                    <p style="text-align: center; font-size: 20px; margin-bottom: 8px; z-index: 10;">${headerText}</p>
                    <div style="margin-right: auto;"></div>
                    ${inj}
                </div>
                ${hrEnable ? `<hr style="border: none; height: 0.5px; margin-top: 0; margin-bottom: 0; background-color: var(--root-text-color); opacity: 0.1; width: calc(100% - 20px);">` : ''}
            `)

            return true

        } catch (e) { 

            page.critical(`Error in frames.js: header function (${e})`) 
            return false

        }
    }
}

/* Update modal (edit o every update) */
if (!(deviceStorage.get(`noDisplayUpdate${siteVersion}`) == 'true') && !(window.innerWidth >= 540 && !(deviceStorage.get('ignorePCDisable') == 'true'))) { modal(`
    <div style=" margin-right: 7%; margin-left: 7%; max-height: 95%; overflow-y: auto; background-color: var(--secondary-bg-color); border: none; border-radius: 24px; box-shadow: 0px 0px 8px var(--navbar-box-color);">
        <h2 style="font-family: 'Montserrat' !important; text-align: center; margin: 16px;">?????????? ????????????????????!</h2>
        <h1 style="font-family: 'Montserrat' !important; text-align: center; margin: 2px; font-size: 52px">${siteVersion}</h1>
        <b style="font-family: 'Montserrat' !important; margin-left: 16px;">??????????????????:</b>
        <ul style="margin: 0px 20px 12px 12px;">
            <li style="font-family: 'Montserrat' !important;">?????????????????????? ?? ?????????????? ?????????????????? ????????????????????</li>
            <li style="font-family: 'Montserrat' !important;">?????????????? ???????????????????? ??????????????????</li>
        </ul>
        <!--<p style="margin-left: 22px; margin-right: 22px;">
            <b style="font-family: 'Montserrat' !important;">???????????????????????????? ????????????????????, ?????????? ???????????????? ????????????! </b>
            <a href="/college${betaRepos}/support/?q=reinstall" style="font-family: 'Montserrat' !important; text-decoration: underline 2px solid var(--root-text-color);">?????? ?????? ???????????????</a>
        </p>-->
        <div style="display: flex; justify-content: center;">
            <button style="font-family: 'Montserrat' !important; cursor: pointer; border: none; border-radius: 24px; height: 36px; font-size: 17px; width: 256px; margin: 4px 16px 16px 16px;" onclick="deviceStorage.write('noDisplayUpdate${siteVersion}', 'true'); document.getElementById('modal').innerHTML = ''; theme.load()">???????????? ???? ????????????????????</button>
        </div>
    </div>
    `) 
}

deviceStorage.write('framesJSBuild', framesBuild);
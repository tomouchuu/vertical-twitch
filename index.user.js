// ==UserScript==
// @name         Better Vertical Twitch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  When on a vertical screen, init this script to move chat below the video
// @author       tomo@uchuu
// @match        https://www.twitch.tv/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    function init() {
        const channelPanel = document.getElementsByClassName('channel-info-content')[0];
        const chatArea = document.querySelector('div[data-a-target="right-column-chat-bar"]').parentElement;
        const chatAreaId = chatArea.id;
        chatArea.remove();

        channelPanel.children[1].remove();
        channelPanel.children[0].insertAdjacentHTML('afterend', `<div id=${chatAreaId}></div>`);

        GM_addStyle(`
            @media screen and (min-width: 920px) {
                .channel-root--hold-chat+.persistent-player,
                .channel-root--watch-chat+.persistent-player,
                .channel-root__info--with-chat .channel-info-content,
                .channel-root__player--with-chat {
                    width: 100% !important;
                }
            }

            #${chatAreaId} {
                margin-top: 2rem;
            }

            .channel-root__right-column--expanded {
                min-height: calc(62vh - 5rem) !important;
                transform: translateX(0) !important;
                width: 100% !important;
            }
        `);
    }
    GM_registerMenuCommand("Initialise", init);
})();

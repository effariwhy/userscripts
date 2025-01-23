// ==UserScript==
// @name         Automate Deleting Facebook Notifications
// @namespace    http://violentmonkey.com/
// @version      1.0
// @author       effariwhy
// @description  Automatically delete notifications
// @match        *://*.facebook.com/notifications*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    async function deleteNotifications() {
        const full_name = await promptForName();
        const menu_label = "Manage " + full_name + " notification settings";
        const delete_label = "Delete this notification";

        while(true) {
            const menu = document.querySelector(`[aria-label="${menu_label}"]`);
            if (!menu) {
                alert('No item found');
                break;
            }
            menu.click();
            await new Promise(r => setTimeout(r, 1000));

            const buttons = document.evaluate(`//span[contains(., '${delete_label}')]`, document, null, XPathResult.ANY_TYPE, null);
            const button = buttons.iterateNext();

            if (!button) {
                break;
            }

            button.click();
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    function promptForName() {
        return new Promise((resolve) => {
            const name = prompt("Enter your full name:");
            resolve(name || "You Full Name");
        });
    }

    function addTriggerButton() {
        const button = document.createElement('button');
        button.textContent = 'Delete Notifications';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        button.addEventListener('click', deleteNotifications);
        document.body.appendChild(button);
    }

    // Violentmonkey-specific style application
    GM_addStyle(`
        #notification-delete-button {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
        }
    `);

    addTriggerButton();
})();

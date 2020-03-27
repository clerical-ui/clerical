import { IClericalConfigComponent } from "@clerical/core";

export const topNav: IClericalConfigComponent = {
    element: 'mwc-top-app-bar',
    c: [{
        element: 'mwc-icon-button',
        icon: 'menu',
        slot: 'navigationIcon'
    }, {
        element: 'div',
        slot: 'title',
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        c: [{
            element: 'img',
            src: 'assets/clerical-logo.svg',
            style: {
                maxHeight: '54px',
                padding: '12px 0',
                display: 'block'
            }
        }, {
            element: 'span',
            innerText: 'Clerical Sandbox'
        }]
    }, {
        element: 'a',
        slot: 'actionItems',
        href: 'https://clerical-ui.github.io/clerical/',
        c: [{
            element: 'span',
            innerText: 'Read the docs'
        }, {
            element: 'mwc-icon-button',
            icon: 'list_alt',
            slot: 'actionItems'
        }]
    }, {
        element: 'a',
        slot: 'actionItems',
        href: 'https://github.com/clerical-ui/clerical',
        c: [{
            element: 'span',
            innerText: 'View the code'
        }, {
            element: 'mwc-icon-button',
            icon: 'code',
            slot: 'actionItems'
        }]
    }]
};

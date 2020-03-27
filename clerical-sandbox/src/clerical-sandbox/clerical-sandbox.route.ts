import { IClericalConfigRoute } from "@clerical/core";
import { topNav } from './top-nav/top-nav.config';
import './clerical-sandbox.css';

export const clericalSandboxRoute: IClericalConfigRoute = {
    path: '/',
    title: 'Clerical Sandbox',
    body: {
        element: 'div',
        class: 'full-height',
        c: [topNav, {
            element: 'div',
            id: 'viewport',
            c: [{
                element: 'div',
                id: 'edit-view-area',
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%'
                },
                c: [{
                    element: 'div',
                    id: 'edit-area',
                    style: {
                        height: 'calc(100% - 40px)',
                        width: '100%',
                        margin: '5px'
                    },
                    c: [{
                        element: 'iframe',
                        src: 'https://stackblitz.com/edit/clerical-starter?embed=1',
                        style: {
                            height: '100%',
                            width: '100%'
                        }
                    }]
                }]
            }]
        }]
    }
};

import { IClericalConfig } from '@clerical/core';

/**
 * The configuration defining the layout and actions of the application.
 * This generally should be seperated into multiple files or downloaded from an API
 */
export const appConfig: IClericalConfig = {
    defaultPath: '/',
    routes: [{
        path: '/',
        title: 'Hello World',
        body: {
            element: 'div',
            id: 'hello-world',
            class: 'hello-world',
            c: [{
                element: 'h1',
                innerText: 'Hello, from the developers of Clerical!'
            }, {
                element: 'h2',
                innerHTML: 'Good luck on your adventures building <b>clerical-sandbox</b>!'
            }]
        }
    }]
};

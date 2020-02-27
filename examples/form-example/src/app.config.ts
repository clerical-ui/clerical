import { IClericalConfig } from '../../../clerical-core/src/clerical-core';

/**
 * The configuration defining the layout and actions of the application.
 * This generally should be seperated into multiple files or downloaded from an API, but is in a single file for this example.
 */
export const appConfig: IClericalConfig = {
    defaultPath: '/login',
    routes: [{
        path: '/login',
        title: 'Form Example - Login',
        body: {
            element: 'div',
            id: 'login',
            class: 'login',
            c: [{
                element: 'h1',
                innerText: 'Please Login'
            }, {
                element: 'mwc-textfield',
                id: 'username',
                state: 'localStorage.username',
                outlined: true,
                label: 'Username'
            }, {
                element: 'mwc-textfield',
                id: 'password',
                type: 'password',
                state: 'password',
                outlined: true,
                label: 'Password'
            }, {
                element: 'mwc-button',
                outlined: true,
                innerText: 'Login',
                events: {
                    click: {
                        name: 'navigate',
                        arguments: ['/home']
                    }
                }
            }]
        }
    }, {
        path: '/home',
        title: 'Form Example - Home',
        body: {
            element: 'div',
            c: [{
                element: 'mwc-top-app-bar',
                c: [{
                    element: 'mwc-icon-button',
                    icon: 'menu',
                    slot: 'navigationIcon'
                }, {
                    element: 'div',
                    slot: 'title',
                    innerText: 'Form Example'
                },
                {
                    element: 'mwc-icon-button',
                    icon: 'exit_to_app',
                    slot: 'actionItems',
                    events: {
                        click: {
                            name: 'navigate',
                            arguments: ['/login']
                        }
                    }
                }]
            }, {
                element: 'section',
                id: 'todo-section',
                events: {
                    keyup: {
                        name: 'add-todo'
                    }
                },
                c: [{
                    element: 'mwc-textfield',
                    state: 'sessionStorage.todo',
                    id: 'todo',
                    label: 'What needs to be done?'
                }, {
                    element: 'div',
                    cFor: {
                        each: 'localStorage.todos',
                        as: 'todo',
                        indexAs: 'todoIndex',
                        template: [{
                            element: 'div',
                            class: 'todo-item',
                            c: [{
                                element: 'div',
                                class: 'todo-item-text',
                                innerText: '{{todo.text}}'
                            }, {
                                element: 'mwc-button',
                                outlined: true,
                                innerText: 'X',
                                events: {
                                    click: {
                                        name: 'remove-todo'
                                    }
                                }
                            }]
                        }]
                    }
                }]
            }]
        }
    }]
};

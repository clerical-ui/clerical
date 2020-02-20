import { Clerical, IClericalConfig } from '../../../clerical-core/src/clerical-core';
import '../../../clerical-material-components';
import '@material/mwc-button';

const config: IClericalConfig = {
    defaultPath: '/home',
    routes: [{
        path: '/home',
        title: 'Home',
        body: {
            element: 'div',
            id: 'home',
            class: 'home',
            c: [{
                element: 'h1',
                innerText: 'Please Login'
            }, {
                element: 'c-text-field',
                id: 'username',
                state: 'localStorage.username'
            }, {
                element: 'mwc-button',
                outlined: true,
                innerText: 'Hello'
            }]
        }
    }]
};

const app = Clerical.startRouter(document.body, config);
console.log(app.state);

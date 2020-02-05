import { Clerical, IClericalConfig } from '@clerical/core';

const config: IClericalConfig = {
    defaultPath: '/login',
    title: 'Clerical Demo',
    routes: [{
        path: '/login',
        title: 'Home',
        component: {
            name: 'c-input-text',
            events: {
                change(event) {
                    console.log('change', event.target.value);
                },
                keyup(event) {
                    console.log('keyup', event.target.value);
                }
            }
        }
    }]
};

const app = Clerical.start(document.body, config);
console.log(app.state);

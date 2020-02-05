import { Clerical, IClericalConfig } from '@clerical/core';
import "@clerical/material-components";
console.log('here');
const config: IClericalConfig = {
    defaultPath: '/login',
    title: 'Clerical Demo',
    routes: [{
        path: '/login',
        title: 'Home',
        component: {
            name: 'c-material-text-field'
        }
    }]
};

const app = Clerical.start(document.body, config);
console.log(app.state);

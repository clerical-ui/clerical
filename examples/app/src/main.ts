import { Clerical, IClericalConfig } from '@clerical/core';

const config: IClericalConfig = {
    defaultPath: '/login',
    title: 'Clerical Demo',
    routes: [{
        path: '/login',
        title: 'Home',
        component: {
            name: 'c-html',
            innerHTML: '<c-html id="abc123"></c-html>',
            components: [{
                id: 'abc123',
                name: 'c-html',
                innerHTML: '<div>Hello World</div>'
            }]
        }
    }]
};

const app = Clerical.start(document.body, config);
console.log(app.state);


const config2 = {
    defaultPath: '/login',
    title: 'Clerical Demo',
    routes: [{
        path: '/login',
        title: 'Home',
        body: {

        }
    }]
}
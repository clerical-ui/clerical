import { Clerical } from './../src/clerical-main/clerical-controller';
import { IClericalConfig } from '../src/clerical-main/clerical-config.model';
import '../src/components/c-html.component';

const config: IClericalConfig = {
    defaultPath: '/home',
    title: 'Clerical Demo',
    routes: [{
        path: '/home',
        title: 'Home',
        component: {
            name: 'bootstrap-grid',
            rows: [{
                components: [{
                    name: 'h2',
                    innerHTML: 'Hello H2'
                }]
            }, {
                components: [{
                    name: 'h3',
                    innerHTML: 'Hello H3'
                }]
            }]
        }
    }, {
        path: '/users',
        title: 'Users',
        component: {
            name: 'c-html',
            innerHTML: '<strong>Hello</strong> Users'
        }
    }]
};

const app = Clerical.start(document.body, config);
console.log(app.state);
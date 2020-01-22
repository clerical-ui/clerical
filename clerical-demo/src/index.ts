import { Clerical, IClericalConfig } from '../../clerical-core/src/clerical';

const config: IClericalConfig = {
    defaultPath: 'home',
    title: 'Clerical Demo',
    routes: [{
        path: 'home',
        layout: [{
            name: 'bootstrap-grid',
            config: {}
        }]
    }]
};
const c = new Clerical(config);
const root = document.getElementById('root')!;
c.start(root);

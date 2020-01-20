import { Clerical, IClericalConfig } from '../../clerical/src/clerical';

const config: IClericalConfig = {
    defaultPath: 'home',
    title: 'Clerical Demo',
    routes: [{
        path: 'home',
        layout: {
            type: 'bootstrap-grid',
            components: []
        }
    }]
};
const c = new Clerical(config);
const root = document.getElementById('root')!;
c.start(root);

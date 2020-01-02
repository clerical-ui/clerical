import { IClericalConfig } from '../clerical-config/clerical-config.model';
import { ClericalController } from './clerical.controller';

export class Clerical {
    controller = new ClericalController(this.config);
    constructor(public config: IClericalConfig) { }

    /**
     * Start Clerical, attaching the config to the element
     * @param element Element to attach to
     */
    start(element: Element) {
        this.loadInitialRoute();
    }

    loadInitialRoute() {
        const loadedCurrent = this.loadRoute(window.location.pathname, true);
        if (!loadedCurrent && this.config.defaultPath) {
            this.loadRoute(this.config.defaultPath, true);
        }
    }

    loadRoute(routePath: string, isFirst?: boolean) {
        return this.controller.loadRoute(routePath, isFirst);
    }
}

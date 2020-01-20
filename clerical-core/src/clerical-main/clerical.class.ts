import { IClericalConfig } from '../clerical-config/clerical-config.model';
import { RouterController } from '../router/router.controller';
import { LayoutController } from '../layout/layout.controller';
import { ComponentController } from '../component/component.controller';

/**
 * This is the primary
 */
export class Clerical {
    router = new RouterController(this.config);
    layout = new LayoutController(this.config);
    component = new ComponentController(this.config);

    constructor(public config: IClericalConfig) { }

    /**
     * Start Clerical, attaching the config to the element
     * @param element Element to attach to
     */
    start(element: Element) {
        this.router.loadInitialRoute();
    }
}

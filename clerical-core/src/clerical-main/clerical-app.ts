import { IClericalOptions } from './clerical-options.model';
import { ComponentController } from './component/component.controller';
import { ClericalEventRegistryController } from '../clerical-event-registry/clerical-event-registry.controller';
import { ClericalRouterController } from '../clerical-router/clerical-router.controller';
import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model';
import { ClericalState } from '../clerical-state/clerical.state';
import '../capabilities/custom-events/unload/unload';

export class ClericalComponent {
    state = new ClericalState(this.options.state || {});
    eventRegistry = ClericalEventRegistryController.createDefaultComponentRegistry(this);
    component = new ComponentController(this.state, this.eventRegistry);

    constructor(public options: IClericalOptions = { state: {} }) {}

    render(target: Element, config: IClericalConfigComponent, ctx?: any): HTMLElement {
        return this.component.setupComponent(target, config, ctx);
    }
}

export class ClericalApp {
    router = new ClericalRouterController(this.target, this.config, (target, config) => this.render(target, config));
    state = new ClericalState(this.options.state || {});
    eventRegistry = ClericalEventRegistryController.createDefaultAppRegistry(this);
    component = new ComponentController(this.state, this.eventRegistry);

    constructor(public target: Element, public config: IClericalConfig, public options: IClericalOptions = {}) {}

    start(): void {
        return this.router.start();
    }

    private render(target: Element, config: IClericalConfigComponent): HTMLElement {
        return this.component.setupComponent(target, config, { router: this.router });
    }
}

const w = window as any;
if (w.globalClerical) {
    w.ClericalApp = ClericalApp;
    w.ClericalComponent = ClericalComponent;
}

import { IClericalConfig } from './../clerical-main/clerical-config.model';
import { Router } from '@vaadin/router';

export class ClericalRouterController {
    router = new Router(this.target);
    constructor(
        public target: Element
    ) { }

    start(config: IClericalConfig): void {
        const routesFormatted: Router.Route[] = config.routes.map(route => ({
            path: route.path,
            component: route.component.name,
            action: (_: any, commands: any) => {
                // Override the vaaden component resolver to apply meta
                commands.component = (c: any) => {
                    const element = document.createElement(c) as any;
                    element.meta = route.component;
                    (this.router as any).__createdByRouter.set(element, true);
                    return element;
                }
            }
        }));
        if (config.defaultPath) {
            routesFormatted.push({
                path: '(.*)',
                redirect: config.defaultPath
            });
        }
        this.router.setRoutes(routesFormatted);
    }
}

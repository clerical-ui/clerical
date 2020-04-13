import {
    IClericalConfig,
    IClericalConfigComponent,
    IClericalConfigRoute
} from './../clerical-main/clerical-config.model';
import Route from 'route-parser';

export class ClericalRouterController {
    routes: string[] = [];
    currentRouteConfig?: IClericalConfigRoute;
    constructor(
        public target: Element,
        public config: IClericalConfig,
        public render: (target: Element, config: IClericalConfigComponent) => HTMLElement
    ) {}

    start(): void {
        const options = { shouldUpdateHistory: false, defaultNavigation: true, _isFirst: true };
        this.navigate(window.location.pathname, options);
    }

    navigate(pathnameOrContext: string, options: INavigationOptions = {}) {
        // 1. Get matching route
        const route = this.config.routes.find((r) => !!new Route(r.path).match(pathnameOrContext));

        if (!route && options.defaultNavigation) {
            // 1.5. If route not matched, navigate to default one if there is one. Otherwise, do nothing.
            if (this.config.defaultPath && pathnameOrContext !== this.config.defaultPath) {
                this.navigate(this.config.defaultPath, options);
            }
        }
        if (!route) {
            return;
        }

        // 2. Clear target's HTML and update title
        document.title = route.title;
        this.target.innerHTML = '';

        // 3. Update route URL
        const shouldUpdateHistory = options.shouldUpdateHistory !== undefined ? options.shouldUpdateHistory : true;
        if (shouldUpdateHistory) {
            window.history.pushState(route, route.title, route.path);
        }
        if ((options as any)._isFirst) {
            window.history.replaceState(route, route.title, route.path);
        }

        this.currentRouteConfig = route;

        // 4. Render URL
        return Array.isArray(route.body)
            ? route.body.map((body) => this.render(this.target, body))
            : this.render(this.target, route.body);
    }
}

export interface INavigationOptions {
    shouldUpdateHistory?: boolean;
    defaultNavigation?: boolean;
}

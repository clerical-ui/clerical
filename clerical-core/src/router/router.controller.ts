import { IClericalConfig } from '../clerical-config/clerical-config.model';
import isNil from 'lodash/isNil';

export class RouterController {
    constructor(
        public config: IClericalConfig
    ) { }

    loadInitialRoute() {
        const loadedCurrent = this.loadRoute(window.location.pathname, { isFirst: true });
        if (!loadedCurrent && this.config.defaultPath) {
            this.loadRoute(this.config.defaultPath, { isFirst: true });
        }
    }

    loadRoute(routePath: string, config: ILoadRouteConfig = {}): boolean {
        let matchedRoute = this.config.routes.find(r => r.path === routePath);

        // Fallback to default if specified
        if (!matchedRoute) {
            return false;
        }
        const currentRoutePath = window.location.pathname.substring(1);
        const isAlreadyRouteInState = config.isFirst && currentRoutePath === matchedRoute.path;
        if (!isAlreadyRouteInState) {
            const title = isNil(matchedRoute.title) ? this.config.title : matchedRoute.title!;
            window.history.pushState(matchedRoute, title, `/${matchedRoute.path}`);
        }
        return true;
    }
}

export interface ILoadRouteConfig {
    isFirst?: boolean;
}

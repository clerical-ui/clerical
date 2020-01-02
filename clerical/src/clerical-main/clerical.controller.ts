import { IClericalConfig } from '../clerical-config/clerical-config.model';
import isNil from 'lodash/isNil';

export class ClericalController {
    constructor(public config: IClericalConfig) { }

    loadRoute(routePath: string, isFirst?: boolean): boolean {
        let matchedRoute = this.config.routes.find(r => r.path === routePath);

        // Fallback to default if specified
        if (!matchedRoute) {
            return false;
        }
        const currentRoutePath = window.location.pathname.substring(1);
        const isAlreadyRouteInState = isFirst && currentRoutePath === matchedRoute.path;
        if (!isAlreadyRouteInState) {
            const title = isNil(matchedRoute.title) ? this.config.title : matchedRoute.title!;
            window.history.pushState(matchedRoute, title, `/${matchedRoute.path}`);
        }
        return true;
    }
}

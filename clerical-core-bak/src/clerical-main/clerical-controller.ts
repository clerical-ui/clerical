import { IClericalConfig } from "./clerical-config.model";
import { ClericalApp } from "./clerical-app";

export class Clerical {
    static start(target: Element, config: IClericalConfig) {
        const app = new ClericalApp(target, config);
        app.router.start(config);
        return app;
    }
}

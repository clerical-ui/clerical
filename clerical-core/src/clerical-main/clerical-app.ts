import { ClericalRouterController } from "../clerical-router/clerical-router.controller";
import { IClericalConfig } from "./clerical-config.model";
import { ClericalState } from "../clerical-state/clerical.state";

export class ClericalApp {
    router = new ClericalRouterController(this.target);
    state = new ClericalState(this.config);

    constructor(
        public target: Element,
        public config: IClericalConfig
    ) { }
}
import { IClericalConfig, IClericalConfigLayoutConfig } from '../clerical-config/clerical-config.model';

export class LayoutController {
    constructor(
        public config: IClericalConfig
    ) { }

    layoutMap = new Map<string, IClericalConfigLayoutConfig>();
    registerLayout(name: string, config: IClericalConfigLayoutConfig) {
        this.layoutMap.set(name, config);
    }
}

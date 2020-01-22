import { IClericalConfig, IClericalConfigLayoutConfig } from '../clerical-config/clerical-config.model';

export class LayoutController {
    layoutMap = new Map<string, IClericalConfigLayoutConfig>();
    constructor(
        public config: IClericalConfig
    ) {
        this.addDefaultLayouts();
    }

    private addDefaultLayouts() {
    }

    registerLayout(name: string, config: IClericalConfigLayoutConfig) {
        this.layoutMap.set(name, config);
    }
}

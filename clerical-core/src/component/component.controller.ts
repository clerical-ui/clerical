import { IClericalConfig } from '../clerical-config/clerical-config.model';

export class ComponentController {
    componentMap = new Map<string, any>();
    constructor(
        public config: IClericalConfig
    ) { }

    registerLayout(name: string, config: any) {
        this.componentMap.set(name, config);
    }
}

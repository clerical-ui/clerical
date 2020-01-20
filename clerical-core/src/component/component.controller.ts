import { IClericalConfig } from '../clerical-config/clerical-config.model';

export class ComponentController {
    constructor(
        public config: IClericalConfig
    ) { }

    componentMap = new Map<string, any>();
    registerLayout(name: string, config: any) {
        this.componentMap.set(name, config);
    }
}

import { IClericalConfig } from '@clerical/core';
import { clericalSandboxRoute } from './clerical-sandbox/clerical-sandbox.route';

export const appConfig: IClericalConfig = {
    defaultPath: '/',
    routes: [clericalSandboxRoute]
};

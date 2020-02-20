import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model'
import { ClericalApp } from './clerical-app'

export class Clerical {
  static startRouter(target: Element, config: IClericalConfig) {
    const app = new ClericalApp(target, config)
    app.router.start(config, app)
    return app
  }
}

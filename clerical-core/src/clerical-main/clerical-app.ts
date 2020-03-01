import { ComponentController } from './component/component.controller'
import { ClericalEventRegistryController } from '../clerical-event-registry/clerical-event-registry.controller'
import { ClericalRouterController } from '../clerical-router/clerical-router.controller'
import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model'
import { ClericalState } from '../clerical-state/clerical.state'
import '../capabilities/custom-events/unload/unload'

export class ClericalComponent {
  state = new ClericalState()
  eventRegistry = ClericalEventRegistryController.createDefaultComponentRegistry(this)
  component = new ComponentController(this.state, this.eventRegistry)

  constructor() {}

  render(target: Element, config: IClericalConfigComponent): HTMLElement {
    return this.component.setupComponent(target, config)
  }
}

export class ClericalApp {
  router = new ClericalRouterController(this.target, this.config, (target, config) =>
    this.render(target, config)
  )
  state = new ClericalState()
  eventRegistry = ClericalEventRegistryController.createDefaultAppRegistry(this)
  component = new ComponentController(this.state, this.eventRegistry)

  constructor(public target: Element, public config: IClericalConfig) {}

  start(): void {
    return this.router.start()
  }

  private render(target: Element, config: IClericalConfigComponent): HTMLElement {
    return this.component.setupComponent(target, config)
  }
}

const w = window as any
if (w.globalClerical) {
  w.ClericalApp = ClericalApp
  w.ClericalComponent = ClericalComponent
}

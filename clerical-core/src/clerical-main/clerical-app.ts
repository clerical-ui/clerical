import { ComponentController } from './component/component.controller'
import { ClericalEventRegistryController } from '../clerical-event-registry/clerical-event-registry.controller'
import { ClericalRouterController } from '../clerical-router/clerical-router.controller'
import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model'
import { ClericalState } from '../clerical-state/clerical.state'
import '../capabilities/custom-events/unload/unload'

export class ClericalApp {
  router = new ClericalRouterController(this.target, this.config, (target, config) =>
    this.render(target, config)
  )
  state = new ClericalState()
  eventRegistry = ClericalEventRegistryController.createDefaultRegistry(this)
  component = new ComponentController(this.state, this.eventRegistry)

  constructor(public target: Element, public config: IClericalConfig) {}

  render(target: Element, config: IClericalConfigComponent): HTMLElement {
    return this.component.setupComponent(target, config)
  }
}

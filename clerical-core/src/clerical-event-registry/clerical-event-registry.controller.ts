import { ClericalApp } from './../clerical-main/clerical-app'
import { EventAliasHandlerCallback } from './../clerical-main/clerical-config.model'

export class ClericalEventRegistryController {
  static createDefaultRegistry(app: ClericalApp): EventRegistry {
    const map = new Map<string, EventAliasHandlerCallback>()
    map.set('navigate', (_, route, options) => app.router.navigate(route, options))

    return map
  }
}

export type EventRegistry = Map<string, EventAliasHandlerCallback>

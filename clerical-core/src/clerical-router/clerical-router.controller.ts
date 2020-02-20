import { IClericalConfig } from './../clerical-main/clerical-config.model'
import { Router } from '@vaadin/router'
import { Clerical } from '../clerical-main/clerical-controller'
import { ClericalApp } from '../clerical-main/clerical-app'

export class ClericalRouterController {
  router = new Router(this.target)
  constructor(public target: Element) {}

  start(config: IClericalConfig, app: ClericalApp): void {
    const routesFormatted: Router.Route[] = config.routes.map(route => ({
      path: route.path,
      component: route.body.element,
      action: (_: any, commands: any) => {
        // Override the vaaden component resolver to apply meta
        commands.component = (c: any) => {
          document.title = route.title
          const root = app.render(this.target, route.body)
          return root
        }
      }
    }))
    if (config.defaultPath) {
      routesFormatted.push({
        path: '(.*)',
        redirect: config.defaultPath
      })
    }
    this.router.setRoutes(routesFormatted)
  }
}

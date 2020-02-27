import { ClericalState } from '../../../clerical-state/clerical.state'
import template from 'lodash/template'
import { Subscription } from 'rxjs'

export class TwoWayBindingController {
  constructor(public state: ClericalState) {}

  bind(element: Element, config: any, key: string): void {
    const e = element as any
    const value = config[key]

    if (typeof value === 'string' && value.includes('{{')) {
      if (key === 'class') {
        this.bindClass(element, config, key)
        return
      }
      const t = template(value, { interpolate: /{{([\s\S]+?)}}/g })
      e[key] = t(e.ctx)
      const subs: Subscription[] = e.subscriptions
      subs.push(
        this.state.stateUpdate$.subscribe(_ => {
          e[key] = t(e.ctx)
        })
      )
    } else {
      // Nothing to template
      e[key] = value
    }
  }

  bindClass(element: Element, config: any, key: string): void {
    const value = config[key]
    const t = template(value, { interpolate: /{{([\s\S]+?)}}/g })
    element.setAttribute('class', t((element as any).ctx))
    const subs: Subscription[] = (element as any).subscriptions
    subs.push(
      this.state.stateUpdate$.subscribe(_ => {
        element.setAttribute('class', t((element as any).ctx))
      })
    )
  }
}

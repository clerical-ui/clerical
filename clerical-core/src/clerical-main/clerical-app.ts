import { ClericalRouterController } from '../clerical-router/clerical-router.controller'
import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model'
import { ClericalState } from '../clerical-state/clerical.state'
import isNil from 'lodash/isNil'
export class ClericalApp {
  router = new ClericalRouterController(this.target)
  state = new ClericalState()

  constructor(public target: Element, public config: IClericalConfig) {}

  render(target: Element, config: IClericalConfigComponent): HTMLElement {
    const element = document.createElement(config.element)

    // Copy properties so they can be referenced by the element
    Object.keys(config).forEach(key => {
      ;(element as any)[key] = config[key]
    })
    if (config.style) {
      Object.keys(config.style).forEach(s => {
        element.style[s as any] = config.style[s]
      })
    }
    if (config.class) {
      element.setAttribute('class', config.class)
    }
    if (config.state) {
      element.addEventListener('change', event => {
        const value = (event.target as any).value
        this.state.updateValue(config.state, value)
      })
      const stateValue = this.state.getValue(config.state)
      if (!isNil(stateValue)) {
        ;(element as any).value = stateValue
      }
    }

    if (config.c) {
      for (const child of config.c) {
        this.render(element, child)
      }
    }
    if (config.events) {
      Object.keys(config.events).forEach(event => {
        console.log(element, event, config.events![event])
        element.addEventListener(event, config.events![event])
      })
    }
    target.appendChild(element)

    return element
  }
}

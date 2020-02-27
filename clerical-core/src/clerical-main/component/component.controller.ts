import { TwoWayBindingController } from './two-way-binding/two-way-binding.controller'
import { EventRegistry } from './../../clerical-event-registry/clerical-event-registry.controller'
import { ClericalState } from './../../clerical-state/clerical.state'
import { IClericalConfigComponent } from './../clerical-config.model'
import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray'
import get from 'lodash/get'
import set from 'lodash/set'
import { Subscription } from 'rxjs'

export class ComponentController {
  twoWayBindingController = new TwoWayBindingController(this.state)
  constructor(private state: ClericalState, private eventRegistry: EventRegistry) {}
  setupComponent(target: Element, config: IClericalConfigComponent, ctx?: any) {
    const element = document.createElement(config.element)
    const e = element as any

    e.subscriptions = []
    element.addEventListener('unload', () => {
      e.subscriptions.forEach((sub: Subscription) => sub.unsubscribe())
    })
    e.__defineGetter__('ctx', () => {
      if (ctx) {
        return {
          ...ctx,
          ...this.state.$
        }
      }
      return this.state.$
    })

    e.connectedCallback = () => element.dispatchEvent(new Event('connectedCallback'))
    // Copy properties so they can be referenced by the element
    Object.keys(config)
      .filter(key => !['style', 'state'].includes(key))
      .forEach(key => {
        this.twoWayBindingController.bind(element, config, key)
      })
    if (config.style) {
      Object.keys(config.style).forEach(s => {
        this.twoWayBindingController.bind(element.style as any, config.style, s)
      })
    }

    if (config.state) {
      element.addEventListener('input', (event: Event) => {
        const value = (event.target as any).value
        this.state.updateValue(config.state, value)
      })

      e.subscriptions.push(
        this.state.observePath(config.state).subscribe(state => {
          const elementValue = get(element, 'value') as string
          if (elementValue !== state.value) {
            set(element, 'value', state.value)
          }
        })
      )
      const stateValue = this.state.getValue(config.state)
      if (!isNil(stateValue)) {
        e.value = stateValue
      }
    }

    if (config.cFor) {
      const stateValue = this.state.getValue(config.cFor.each)
      if (Array.isArray(stateValue)) {
        let index = 0
        for (const item of stateValue) {
          for (const component of config.cFor.template) {
            this.setupComponent(element, component, {
              [config.cFor.as]: item,
              [config.cFor.indexAs || 'index']: index
            })
          }
          index++
        }
      }
      e.subscriptions.push(
        this.state.observePath(config.cFor.each).subscribe(up => {
          const stateValue = up.value
          e.innerHTML = ''
          if (Array.isArray(stateValue)) {
            let index = 0
            for (const item of stateValue) {
              for (const component of config.cFor!.template) {
                this.setupComponent(element, component, {
                  [config.cFor!.as]: item,
                  [config.cFor!.indexAs || 'index']: index
                })
              }
              index++
            }
          }
        })
      )
    } else if (config.c) {
      for (const child of config.c) {
        this.setupComponent(element, child, e.ctx)
      }
    }
    if (config.events) {
      Object.keys(config.events).forEach(event => {
        const eventActions = castArray(config.events![event])
        for (const eventAction of eventActions) {
          if (typeof eventAction === 'function') {
            element.addEventListener(event, eventAction)
          } else {
            const handler = this.eventRegistry.get(eventAction.name)
            if (!handler) {
              throw new Error(
                `No handler with the name "${eventAction.name}" found in the registry. Please register a handler by calling \`app.eventRegistry.set("${eventAction.name}", /* todo */)\`.`
              )
            }
            element.addEventListener(event, e => handler(e, ...(eventAction.arguments || [])))
          }
        }
      })
    }
    element.dispatchEvent(new Event('preload'))
    target.appendChild(e)
    element.dispatchEvent(new Event('load'))

    return element
  }
}

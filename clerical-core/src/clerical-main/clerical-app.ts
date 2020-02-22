import { ClericalEventRegistryController } from '../clerical-event-registry/clerical-event-registry.controller';
import { ClericalRouterController } from '../clerical-router/clerical-router.controller'
import { IClericalConfig, IClericalConfigComponent } from './clerical-config.model'
import { ClericalState } from '../clerical-state/clerical.state'
import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray';
import get from 'lodash/get';
import set from 'lodash/set';
const originalRemoveChild = Node.prototype.removeChild;
(Node as any).prototype.removeChild = function(child: any) {
  const result = originalRemoveChild.apply(this, arguments as any);
  if (!child.unloaded) {
    child.dispatchEvent(new Event('unload'));
    child.unloaded = true;
  }
  return result;
};
const originalRemove = Element.prototype.remove;
(Element as any).prototype.remove = function() {
  const result = originalRemove.apply(this, arguments as any);
  if (!this.unloaded) {
    this.dispatchEvent(new Event('unload'));
    this.unloaded = true;
  }
  return result;
};
Element.prototype.remove

export class ClericalApp {
  router = new ClericalRouterController(this.target)
  state = new ClericalState()
  eventRegistry = ClericalEventRegistryController.createDefaultRegistry(this);

  constructor(public target: Element, public config: IClericalConfig) { }

  render(target: Element, config: IClericalConfigComponent): HTMLElement {
    const element = document.createElement(config.element);
    (element as any).connectedCallback = () => element.dispatchEvent(new Event('connectedCallback'));

    // Copy properties so they can be referenced by the element
    Object.keys(config).forEach(key => {
      ; (element as any)[key] = config[key]
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
      const sub = this.state.observePath(config.state).subscribe((state) => {
        const elementValue = get(element, 'value') as string;
        if (elementValue !== state.value) {
          set(element, 'value', stateValue);
        }
      });
      element.addEventListener('unload', () => sub.unsubscribe());
      const stateValue = this.state.getValue(config.state)
      if (!isNil(stateValue)) {
        (element as any).value = stateValue
      }
    }

    if (config.c) {
      for (const child of config.c) {
        this.render(element, child)
      }
    }
    if (config.events) {
      Object.keys(config.events).forEach(event => {
        const eventActions = castArray(config.events![event]);
        for (const eventAction of eventActions) {
          if (typeof eventAction === 'function') {
            element.addEventListener(event, eventAction);
          } else {
            const handler = this.eventRegistry.get(eventAction.name);
            if (!handler) {
              throw new Error(`No handler with the name "${eventAction.name}" found in the registry. Please register a handler by calling \`app.eventRegistry.set("${eventAction.name}", /* todo */)\`.`);
            }
            element.addEventListener(event, (e) => handler(e, ...(eventAction.arguments || [])));
          }
        }
      })
    }
    element.dispatchEvent(new Event('preload'));
    target.appendChild(element)
    element.dispatchEvent(new Event('load'));

    return element
  }
}

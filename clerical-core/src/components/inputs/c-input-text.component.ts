import template from 'lodash/template';
const defaultHTML = `<input type="text">`;
export interface IInputTextMeta {
    cid?: string;
    innerHTML?: string;
    /**
     * The selector utilized to attach events to the element
     */
    inputSelector?: string;
    events?: {
        [eventName: string]: (event: Event, meta: IInputTextMeta) => void;
    };
}
export class ClericalInputText extends HTMLElement {
    static defaultHTML = defaultHTML;
    static defaults = {
        innerHTML: defaultHTML,
        inputSelector: 'input'
    };
    meta?: IInputTextMeta;
    connectedCallback() {
        if (this.meta) {
            const html = this.meta.innerHTML || ClericalInputText.defaults.innerHTML;
            const t = template(html)
            this.innerHTML = t(this.meta);
            if (this.meta.events) {
                const inputSelector = this.meta.inputSelector || ClericalInputText.defaults.inputSelector;
                const element = document.querySelector(inputSelector);
                Object.keys(this.meta.events).forEach(event => {
                    const handler = this.meta!.events![event];
                    element?.addEventListener(event, (e) => {
                        handler(e, this.meta!);
                    });
                });
            }
        }
    }
}
customElements.define('c-input-text', ClericalInputText);

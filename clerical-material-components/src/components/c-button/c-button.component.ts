import { MDCRipple } from '@material/ripple';

export const defaultcButtonHtml = `
<mwc-button label="standard"></mwc-button>
`;

export class CButton extends HTMLElement {
    mdcRipple?: MDCRipple;
    input?: HTMLInputElement;
    _value: string = '';
    connectedCallback() {
        this.rerender();
    }
    rerender() {
        this.innerHTML = defaultcButtonHtml;
        this.input = this.querySelector('input')!;
        if (this.input && this._value) {
            this.input.value = this._value;
        }
        this.mdcRipple = new MDCRipple(this.querySelector('.mdc-button')!);
    }

    get value() {
        return this.input ? this.input.value : this._value;
    }
    set value(v: string) {
        this._value = v;
        if (this.input) {
            this.input.value = v;
        }
    }
}

customElements.define('c-button', CButton);

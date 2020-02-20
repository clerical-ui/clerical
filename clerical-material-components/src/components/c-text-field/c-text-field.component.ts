import { MDCTextField } from '@material/textfield';

export const defaultCTextFieldHtml = `
<div class="mdc-text-field">
  <input type="text" id="my-text-field" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="my-text-field">Hint text</label>
  <div class="mdc-line-ripple"></div>
</div>`;

export class CTextField extends HTMLElement {
    mdcTextField?: MDCTextField;
    input?: HTMLInputElement;
    _value: string = '';
    connectedCallback() {
        this.rerender();
    }
    rerender() {
        this.innerHTML = defaultCTextFieldHtml;
        this.input = this.querySelector('input')!;
        if (this.input && this._value) {
            this.input.value = this._value;
        }
        this.mdcTextField = new MDCTextField(this.querySelector('.mdc-text-field')!);
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
    createInputElement(config: IInputConfig) {
        const el = document.createElement('input');

        return el;
    }
}

customElements.define('c-text-field', CTextField);

export interface IInputConfig {

}
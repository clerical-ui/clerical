const htmlTemplate = `
<div class="mdc-text-field">
  <input type="text" id="my-text-field" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="my-text-field">Hint text</label>
  <div class="mdc-line-ripple"></div>
</div>
`;

export interface CMaterialTextFieldComponentMeta {

}
export class CMaterialTextFieldComponent extends HTMLElement {
    meta?: CMaterialTextFieldComponentMeta;

    connectedCallback() {
      this.innerHTML = htmlTemplate;
    }
}

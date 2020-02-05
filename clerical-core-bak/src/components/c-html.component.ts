export interface IHTMLMeta {
    innerHTML?: string;
    innerText?: string;
}
export class ClericalHTML extends HTMLElement {
    meta: IHTMLMeta;
    connectedCallback() {
        if (this.meta.innerText) {
            this.innerText = this.meta.innerText;
        } else if (this.meta.innerHTML) {
            this.innerHTML = this.meta.innerHTML;
        }
    }
}
customElements.define('c-html', ClericalHTML);

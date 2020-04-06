---
title: "Web Components and Metadata"
permalink: /docs/web-components-and-metadata/
toc: true
---

## Clerical and Web Components
Web Components are the building blocks of the web today - and they are also a great tool to use when building a Clerical application.

To make Web Components more configuration-friendly, Clerical adds the ability to attach additional metadata to any Element. __Any configuration added to an element's contract definition will be attached as properties of the DOM element.__


## Configuring a Web Componnt
Since the metadata will be automatically attached to the element, many attributes that are built-in to the browser automatically work when passed, such as `id`, `class`, `style`, and any other properties already specified by a Web Component.


## Example - Building a Car Component
Let's pretend that a car component might be useful to build for an  application.

We decide that a component requires `make`, `model`, `year`, and `color` as input variables. We can start building the Web Component in the following way:


```typescript
class MyCarComponent extends HTMLElement {
    make: string;
    model: string;
    year: number;
    color: string;
}
customElements.define('my-car', MyCarComponent);
```

When we build the contract for a `my-car` element, it will look like the following:

```json
{
    "element": "my-car",
    "make": "Ford",
    "model": "Fiesta",
    "year": 2014,
    "color": "Blue"
}
```

If we define a connectedCallback, we have eaccess to utilize the configuration parameters.


```typescript
class MyCarComponent extends HTMLElement {
    make: string;
    model: string;
    year: number;
    color: string;

    connectedCallback() {
        // Displays Blue 2014 Ford Fiesta
        this.innerText = `${this.color} ${this.year} ${this.make} ${this.model}`;
    }
}
customElements.define('my-car', MyCarComponent);
```

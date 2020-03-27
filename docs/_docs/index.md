---
title: "Clerical Docs"
permalink: /docs/
toc: true
---

![alt text](/assets/clerical-logo-text.png "Clerical")

The minimal code, Contract-Driven UI web component framework.

## What is a Contract-Driven UI?
TODO

## Why is Clerical different?
Most web application frameworks encourage and expect UI code to include all business logic and functionality to be bundled into a single application. These applications can become massive and complex.

With Clerical, configuration can be managed on the **server** rather than on the **client**. Moving elements around, hiding or displaying functionality based on the user type, and even event management can be all configured so that the UI application does not have to be touched unless there is a fundamental UX or styling change.

Instead, the UI application can be deployed with the necessary web components and styling, and worry not about implementing all of the functionality.

## Getting Started
To begin, first install Clerical Core with `npm install @clerical/core`. Clerical is built with TypeScript, so types are included within the installation.

Clerical can run in two ways:
 - 1. A single-page application can be created with a simple router.
 - 2. Component configuration can be attached to a single DOM element.

## Running Clerical as a Single-Page Application

Clerical web applications are started with four easy steps:

 - 1. Import any web components you are planning to use, along with any necessary shims.
 - 2. Define your app configurations. This defines what web components to display, as well as the hierarchy, for every route specified in your application.
 - 3. Create the `ClericalApp` with your built application configuration.
 - 4. Add event handlers to the `eventRegistry` in the app.
 - 5. Start the app by calling start. This will begin attaching your elements to the DOM based on the route.

### Sample Hello World - Single-Page Application

```javascript
import { ClericalApp, IClericalConfig } from '@clerical/core';

// 1. Import any web components
// None used in this example

// 2. Define the appConfig
export const appConfig: IClericalConfig = {
    defaultPath: '/home',
    routes: [{
        path: '/home',          // <== This is the path to match
        title: 'Home',          // <== This is the title of the page
        body: {                 // <== This is the element hierarchy to render
            element: 'div',
            id: 'home-route',
            c: [{               // <== Recursively set subcomponents. Configuration is attached to the Element in the DOM.
                element: 'h1',
                id: 'hello-world',
                innerText: 'Hello World!',
                events: {           // <== This is where events get attached to the element
                    click: {
                        name: 'hello-world-click'
                    }
                }
            }]
        }
    }]
}

// 3. Create the ClericalApp

const app = new ClericalApp(document.body, appConfig);

// 4. Add event handlers to the event registry

app.eventRegistry.set('hello-world-click', (event) => alert('Hello World from: ' + event.target.id));

// 5. Start the app

app.start();
```


### Attaching Clerical configuration to the DOM
Clerical components can be attached to the DOM by doing the following:

 - 1. A ClericalComponent can be instantiated with no default configuration:
 - 2. Once it is instantiated, the app can render a component configuration onto a target.

### Sample Hello World - Attach to DOM
```javascript
import { ClericalComponent, IClericalConfigComponent } from '@clerical/core';

// 1. Import any web components
// None used in this example

// 2. Define the appConfig
export const componentConfig: IClericalConfigComponent = {
    element: 'h1',
    class: 'hello-world',
    innerHTML: 'Hello <i>World</i>!',
    events: {
        load: {
            name: 'hello-world-load'
        }
    }
};

// 3. Create the ClericalComponent

const c = new ClericalComponent();

// 4. Add event handlers to the event registry

c.eventRegistry.set('hello-world-load', (event) => alert('Hello World from: ' + event.target.id));

// 5. Render the component

c.render(document.getElementById('parent'), componentConfig);
```

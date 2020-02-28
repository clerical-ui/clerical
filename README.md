# Clerical
The minimal code, Contract-Driven UI web component framework.

## What is a Contract-Driven UI?
TODO

## Why should I use Clerical?

## Getting Started
To begin, first install Clerical Core with `npm install @clerical/core`. Clerical is built with TypeScript, so types are included within the installation.

Clerical can run in two ways:
 - 1. A single-page application can be created with a simple router.
 - 2. Component configuration can be attached to a single DOM element.

## Running Clerical as a Single-Page Application

Clerical web applications are started with four easy steps:

 - 1. Import any web components you are planning to use, along with any necessary shims.

 - 2. Define your app configurations. This defines what web components to display, as well as the hierarchy, for every route specified in your application.

 i.e.: `import '@material/mwc-button';`

 - 3. Create the `ClericalApp` with your built application configuration.

`const app = new ClericalApp(document.body, appConfig);`

 - 4. Add event handlers to the `eventRegistry` in the app.

 `app.eventRegistry.set('event-stringify', (event) => alert(JSON.stringify(event)));`

 - 5. Start the app by calling start. This will begin attaching your elements to the DOM based on the route.

 `app.start();`


### Attaching Clerical configuration to a Single DOM Element
Clerical components can be attached to the DOM by doing the following:


 - 1. A ClericalComponent can be instantiated with no default configuration:

`const component = new ClericalComponent();`

 - 2. Once it is instantiated, the app can render a component configuration onto a target.

`app.render(document.body, componentConfig);`

### Component Configuration
TODO

### Sample Hello World


`
import { ClericalApp } from '@clerical/core';

// 1. Import any web components
// None used in this example

// 2. Define the appConfig
export const appConfig: IClericalConfig = {
    defaultPath: '/home',
    routes: [{
        path: '/home',          // <== This is the path to match
        title: 'Home',          // <== This is the title of the page
        body: {                 // <== This is the element hierarchy to render
            element: 'h1',
            id: 'hello-world',
            events: {           // <== This is where events get attached to the element
                click: {
                    name: 'hello-world-click'
                }
            }
        }
    }]
}

// 3. Create the ClericalApp

const app = new ClericalApp(document.body, appConfig);

// 4. Add event handlers to the event registry

app.eventRegistry.set('hello-world-click', (event) => alert('Hello World from: ' + event.target.id));

// 5. Start the app

app.start();
`
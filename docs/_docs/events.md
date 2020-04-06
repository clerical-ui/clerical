---
title: "Events"
permalink: /docs/events/
toc: true
---

## Events Introduction
Clerical adds additional events to enable hooking into the lifecycle of a component. These events are added to enable adding the appropriate events to a contract to enable building a route as easy as possible.

## Web Component Life Cycle Events
The following events are specific to the Web Component Life Cycle. If no callback is already defined, the element will dispatch an event when the callback occurs with the same name.

<small>For more information about Web Component Life Cycle callbacks, please see: <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">https://developer.mozilla.org/en-US/docs/Web/Web_Components</a></small>

<table>
  <thead>
    <tr>
      <td>Event Name</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>connectedCallback</td>
      <td>Emitted on the Element when the component is connected to the DOM.</td>
    </tr>
    <tr>
      <td>disconnectedCallback</td>
      <td>Emitted on the Element when the component is disconnected from the DOM.</td>
    </tr>
    <tr>
      <td>adoptedCallback</td>
      <td>Emitted when the Element is moved to a new document.</td>
    </tr>
    <tr>
      <td>attributeChangedCallback</td>
      <td>Emitted when an attribute changes on the element.</td>
    </tr>
  </tbody>
</table>

## DOM Construction Events
The following events are related to when Clerical adds or removes elements to the DOM. If any elements are added or removed manually, these will not trigger.

<table>
  <thead>
    <tr>
      <td>Event Name</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>preload</td>
      <td>Prior to the element being appended to the DOM, the preload event triggers.</td>
    </tr>
    <tr>
      <td>load</td>
      <td>Once the DOM elemeent has been appended, the load event triggers.</td>
    </tr>
    <tr>
      <td>unload</td>
      <td>Once the element is removed (via Element#remove or Element#removeChild), the unload event will trigger.</td>
    </tr>
  </tbody>
</table>
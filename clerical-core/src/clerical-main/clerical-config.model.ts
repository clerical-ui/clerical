export interface IClericalConfig {
    /**
     * Default path to use as a fallback
     */
    defaultPath?: string;

    /**
     * Array of routes to define as part of the contract
     */
    routes: IClericalConfigRoute[];
}

export interface IClericalConfigRoute {
    /**
     * The path to use for the route
     */
    path: string;

    /**
     * The title to give the browser
     */
    title: string;

    /**
     * Layout the route will use
     */
    body: IClericalConfigComponent;
}

export interface IClericalConfigComponent {
    /**
     * The name of the registered layout to use
     */
    element: string;

    id?: string;

    class?: string;

    innerText?: string;

    innerHTML?: string;

    c?: IClericalConfigComponent[];

    cFor?: IClericalFor;

    events?: IClericalEventHandlers;

    /**
     * The installed layouts can have their own properties
     */
    [prop: string]: any;
}

export interface IClericalConfigLayoutConfig extends Object {}

export interface IClericalEventHandlers {
    [eventName: string]: EventAction | EventAction[];
}

export type EventCallback = (event: Event | any) => any;
export interface EventAliasHandler {
    name: string;
    arguments?: any[];
}
export type EventAliasHandlerCallback = (event: Event | any, ...args: any[]) => any;

export type EventAction = EventCallback | EventAliasHandler;

export interface IClericalFor {
    each: string;
    as: string;
    indexAs?: string;
    template: IClericalConfigComponent[];
}

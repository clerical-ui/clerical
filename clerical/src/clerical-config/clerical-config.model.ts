export interface IClericalConfig {
    /**
     * Default path to use as a fallback
     */
    defaultPath?: string;

    /**
     * Title of the document, fallback for routes who do not have a title
     */
    title: string;

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
    title?: string;
}

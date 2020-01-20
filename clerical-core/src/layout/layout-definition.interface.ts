export interface ILayoutDefinition<T> {
    name: string;
    load(layoutInput: ICreateLayoutInput<T>);
    unload?();
}

export interface ICreateLayoutInput<T> {
    layoutConfig?: T;
    rootElement: Element;
}

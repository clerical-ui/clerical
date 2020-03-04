export interface IClericalOptions {
  state?: IStateOptions
}

export interface IStateOptions {
  /**
   * Enable or disable the state
   * @default true
   */
  enabled?: boolean

  /**
   * The key to use for storing state in localStorage
   * @default state
   */
  localStorageKey?: string

  /**
   * The key to use for storing state in sessionStorage
   * @default state
   */
  sessionStorageKey?: string

  /**
   * Time to wait in ms for a state change before performing I/O to storage.
   * Default: 300 (ms)
   */
  storageDebounceTime?: number
}

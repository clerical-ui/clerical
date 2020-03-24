import { IStateOptions, IClericalOptions } from './../clerical-main/clerical-options.model'
import { Subject } from 'rxjs'
import { filter, debounceTime } from 'rxjs/operators'
import get from 'lodash/get'
import set from 'lodash/set'

export class ClericalState {
  static defaultOptions: IStateOptions = {
    enabled: true,
    localStorageKey: 'state',
    sessionStorageKey: 'state',
    storageDebounceTime: 300
  }
  private stateOptions: IStateOptions = {
    ...ClericalState.defaultOptions,
    ...this.options
  }
  private lsKey = this.stateOptions.localStorageKey!
  private ssKey = this.stateOptions.sessionStorageKey!
  $: IClercialStateData = this.loadDefaultValue()
  stateUpdate$ = new Subject<IStateUpdate>()

  constructor(private options: IStateOptions) {
    if (this.stateOptions.enabled) {
      this.stateUpdate$
        .pipe(
          filter(
            (update: IStateUpdate) => update.path.startsWith('localStorage'),
            debounceTime(this.stateOptions.storageDebounceTime!)
          )
        )
        .subscribe((_: IStateUpdate) => {
          localStorage.setItem(this.lsKey, JSON.stringify(this.$.localStorage))
        })
      this.stateUpdate$
        .pipe(
          filter(
            (update: IStateUpdate) => update.path.startsWith('sessionStorage'),
            debounceTime(this.stateOptions.storageDebounceTime!)
          )
        )
        .subscribe((_: IStateUpdate) => {
          sessionStorage.setItem(this.ssKey, JSON.stringify(this.$.sessionStorage))
        })
    }
  }

  updateValue(path: string, value: any): void {
    const previousValue = get(this.$, path)
    if (previousValue !== value) {
      set(this.$, path, value)
      this.stateUpdate$.next({ path, value, previousValue })
    }
  }
  getValue(path: string): any {
    return get(this.$, path)
  }

  observePath(path: string) {
    return this.stateUpdate$.pipe(filter((update: IStateUpdate) => update.path === path))
  }

  private loadDefaultValue() {
    return {
      localStorage: this.load(localStorage, this.lsKey),
      sessionStorage: this.load(sessionStorage, this.ssKey)
    }
  }
  private load(storage: Storage, key: string) {
    try {
      return JSON.parse(storage.getItem(key) || '{}')
    } catch {
      return {}
    }
  }
}

export interface IClercialStateData {
  localStorage: any
  sessionStorage: any
  [key: string]: any
}

export interface IStateUpdate {
  path: string
  value: any
  previousValue: any
}

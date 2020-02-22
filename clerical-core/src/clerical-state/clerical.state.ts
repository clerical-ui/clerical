import { Subject } from 'rxjs'
import { filter, debounceTime } from 'rxjs/operators'
import get from 'lodash/get'
import set from 'lodash/set'

export class ClericalState {
  private lsKey = 'state'
  private ssKey = 'state'
  $: IClercialStateData = this.loadDefaultValue()
  stateUpdate$ = new Subject<{ path: string; value: any; previousValue: any }>()
  constructor() {
    this.stateUpdate$
      .pipe(filter(update => update.path.startsWith('localStorage.'), debounceTime(300)))
      .subscribe(_ => {
        localStorage.setItem(this.lsKey, JSON.stringify(this.$.localStorage))
      })
    this.stateUpdate$
      .pipe(filter(update => update.path.startsWith('sessionStorage.'), debounceTime(300)))
      .subscribe(_ => {
        sessionStorage.setItem(this.ssKey, JSON.stringify(this.$.sessionStorage))
      })
  }

  updateValue(path: string, value: any): void {
    const previousValue = get(this.$, path)
    set(this.$, path, value)
    this.stateUpdate$.next({ path, value, previousValue })
  }
  getValue(path: string): any {
    return get(this.$, path)
  }

  observePath(path: string) {
    return this.stateUpdate$
      .pipe(filter(update => update.path === path));
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

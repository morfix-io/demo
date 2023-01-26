import SerializeStateError from './SerializeStateError'
import utils from 'shared/utils'

class SyncState {
  constructor({ handleError }) {
    this.handleError = handleError || SyncState.logError
    this.localStorageIsSupported = Boolean(window.localStorage)
  }

  static logError(error) {
    // eslint-disable-next-line
    console.error(error)
  }

  serialize(state) {
    if (this.localStorageIsSupported) {
      const serializedState = JSON.stringify(state)
      window.localStorage.setItem('state', serializedState)
    }
  }

  deserialize() {
    if (this.localStorageIsSupported) {
      const stringifiedState = window.localStorage.getItem('state')
      if (stringifiedState) {
        return JSON.parse(stringifiedState)
      }
    }
    return {}
  }

  getRawState() {
    if (this.localStorageIsSupported) {
      return window.localStorage.getItem('state')
    }
    return null
  }

  mergeSyncStateWithInitial(syncState, initialState) {
    const entries = Object.entries(syncState)
    return entries.reduce((mergeResult, [syncKey, syncValue]) => {
      if (utils.isObject(syncValue)) {
        return {
          ...mergeResult,
          [syncKey]: {
            ...initialState[syncKey],
            ...this.mergeSyncStateWithInitial(syncValue, initialState[syncKey])
          }
        }
      }
      return {
        ...mergeResult,
        [syncKey]: syncValue
      }
    }, {})
  }

  saveState(state) {
    try {
      this.serialize(state)
    } catch {
      const error = new SerializeStateError({
        action: SerializeStateError.SERIALIZE,
        data: state
      })
      this.handleError(error)
    }
  }

  loadState(initialState) {
    try {
      const state = this.deserialize()
      return this.mergeSyncStateWithInitial(state, initialState)
    } catch {
      const error = new SerializeStateError({
        action: SerializeStateError.DESERIALIZE,
        data: this.getRawState()
      })
      this.handleError(error)
    }
  }
}

export default SyncState

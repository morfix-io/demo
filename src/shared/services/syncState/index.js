import SyncState from './SyncState'

const syncState = {}

syncState.init = params => {
  return new SyncState(params)
}

export default syncState

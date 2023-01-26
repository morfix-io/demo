import keyWatcher from './keyWatcher'

import getUserKeysWatcher from './getUserKeysWatcher'
import createKeyWatcher from './createKeyWatcher'
import readKeyWatcher from './readKeyWatcher'
import updateKeyWatcher from './updateKeyWatcher'
import deleteKeyWatcher from './deleteKeyWatcher'

export default {
  getUserKeysWatcher,
  createKeyWatcher,
  readKeyWatcher,
  updateKeyWatcher,
  deleteKeyWatcher,
  main: keyWatcher
}

import uploadSecretKeyWatcher from './uploadSecretKeyWatcher'
import engineWatcher from './engineWatcher'
import prepareWatcher from './prepareWatcher'
import computeWatcher from './computeWatcher'
import responseWatcher from './responseWatcher'

export default {
  uploadSecretKeyWatcher,
  prepareWatcher,
  computeWatcher,
  responseWatcher,
  main: engineWatcher
}

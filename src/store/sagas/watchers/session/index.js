import sessionWatcher from './sessionWatcher'
import registerUserWatcher from './registerUserWatcher'
import loginUserWatcher from './loginUserWatcher'
import logoutUserWatcher from './logoutUserWatcher'
import requestWatcher from './requestWatcher'
import refreshTokenRequestWatcher from './refreshTokenRequestWatcher'
import verifyEmailWatcher from './verifyEmailWatcher'
import verifyDeviceWatcher from './verifyDeviceWatcher'
import verifyResetWatcher from './verifyResetWatcher'
import verifyInvitationWatcher from './verifyInvitationWatcher'
import forgotPasswordWatcher from './forgotPasswordWatcher'

export default {
  requestWatcher,
  verifyEmailWatcher,
  verifyDeviceWatcher,
  verifyResetWatcher,
  verifyInvitationWatcher,
  registerUserWatcher,
  loginUserWatcher,
  logoutUserWatcher,
  forgotPasswordWatcher,
  refreshTokenRequestWatcher,
  main: sessionWatcher
}

import registerUserWorker from './registerUserWorker'
import loginUserWorker from './loginUserWorker'
import logoutUserWorker from './logoutUserWorker'
import requestWorker from './requestWorker'
import refreshTokenRequestWorker from './refreshTokenRequestWorker'
import forgotPasswordWorker from './forgotPasswordWorker'
import verifyEmailWorker from './verifyEmailWorker'
import verifyDeviceWorker from './verifyDeviceWorker'
import verifyResetWorker from './verifyResetWorker'
import verifyInvitationWorker from './verifyInvitationWorker'

export default {
  requestWorker,
  verifyEmailWorker,
  verifyDeviceWorker,
  verifyResetWorker,
  verifyInvitationWorker,
  registerUserWorker,
  loginUserWorker,
  logoutUserWorker,
  forgotPasswordWorker,
  refreshTokenRequestWorker
}

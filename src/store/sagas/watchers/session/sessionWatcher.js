import { all, getContext } from 'redux-saga/effects'

export default function* sessionWatcher() {
  const watchers = yield getContext('watchers')

  yield all([
    watchers.session.requestWatcher(),
    watchers.session.verifyEmailWatcher(),
    watchers.session.verifyDeviceWatcher(),
    watchers.session.verifyResetWatcher(),
    watchers.session.verifyInvitationWatcher(),
    watchers.session.registerUserWatcher(),
    watchers.session.loginUserWatcher(),
    watchers.session.logoutUserWatcher(),
    watchers.session.forgotPasswordWatcher(),
    watchers.session.refreshTokenRequestWatcher()
  ])
}

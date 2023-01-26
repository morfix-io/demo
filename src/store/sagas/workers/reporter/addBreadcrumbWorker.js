import { getContext, call } from 'redux-saga/effects'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from 'store/constants/session'

import { getBreadcrumbDataFromAction } from 'store/sagas/utils'

const ignorePayloadTypes = [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS]

export default function* addBreadcrumbWorker(action) {
  try {
    const reporter = yield getContext('reporter')
    const breadcrumb = {
      level: 'info',
      category: 'redux',
      message: action.type,
      data: {
        payload: ignorePayloadTypes.includes(action.type) ? '[HIDDEN]' : getBreadcrumbDataFromAction(action)
      }
    }

    yield call(reporter.addBreadcrumb, breadcrumb)
  } catch (error) {
    // eslint-disable-next-line
    console.error('Could not add a breadcrumb:', error)
  }
}

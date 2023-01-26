import * as sentry from '@sentry/browser'
import config from 'config'

const sentryProvider = {}

sentryProvider.init = () => {
  return sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.NODE_ENV
    // whitelistUrls: [`https://${config.FRONTEND_HOST}/static/js`]
  })
}

sentryProvider.sendError = error => {
  sentry.addBreadcrumb({
    level: 'error',
    category: 'error',
    message: 'ERROR',
    data: {
      payload: JSON.stringify(error, null, 2)
    }
  })
  return sentry.captureException(error)
}

sentryProvider.addBreadcrumb = crumb => {
  return sentry.addBreadcrumb(crumb)
}

export default sentryProvider

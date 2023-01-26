import providers from './providers/index'
import config from 'config'

const getReporter = () => {
  switch (config.NODE_ENV) {
    case 'production':
      return providers.sentry
    case 'development':
      return providers.log
    default:
      return providers.log
  }
}

export default getReporter()

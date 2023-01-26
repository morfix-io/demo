import providers from './providers/index'
import config from 'config'

const getTracking = () => {
  switch (config.NODE_ENV) {
    case 'production':
      return providers.gtm
    case 'development':
      return providers.log
    default:
      return providers.log
  }
}

export default getTracking()

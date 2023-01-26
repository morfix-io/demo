import gtm from 'react-gtm-module'
import config from 'config'

const gtmProvider = {}

gtmProvider.init = () => {
  return gtm.initialize({
    gtmId: config.GTM_ID
  })
}

export default gtmProvider

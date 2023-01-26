import { connect } from 'react-redux'

import { verifyDeviceRequest } from 'store/actions/session'
import { selectSessionMessage } from 'store/selectors/session'
import { selectRouterLocation } from 'store/selectors/router'

import VerifyDeviceContainer from './VerifyDeviceContainer'

const mapStateToProps = state => {
  return {
    message: selectSessionMessage(state),
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  verifyRequest: verifyDeviceRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyDeviceContainer)

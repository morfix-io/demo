import { connect } from 'react-redux'

import { verifyResetRequest } from 'store/actions/session'

import { selectRouterLocation } from 'store/selectors/router'

import VerifyResetContainer from './VerifyResetContainer'
import { selectSessionRequestState } from 'store/selectors/session'

const mapStateToProps = state => {
  return {
    loading: selectSessionRequestState(state),
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  verifyRequest: verifyResetRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyResetContainer)

import { connect } from 'react-redux'

import { forgotPasswordRequest } from 'store/actions/session'
import { selectSessionMessage, selectSessionRequestState } from 'store/selectors/session'
import { selectRouterLocation } from 'store/selectors/router'

import ForgotPasswordFormContainer from './ForgotPasswordFormContainer'

const mapStateToProps = state => {
  return {
    message: selectSessionMessage(state),
    loading: selectSessionRequestState(state),
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  forgotPasswordRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormContainer)

import { connect } from 'react-redux'

import { registerUserRequest } from 'store/actions/session'
import { selectSessionRequestState } from 'store/selectors/session'
import { selectRouterLocation } from 'store/selectors/router'

import RegistrationFormContainer from './RegistrationFormContainer'

const mapStateToProps = state => {
  return {
    loading: selectSessionRequestState(state),
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  registerUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer)

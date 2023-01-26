import { connect } from 'react-redux'

import { loginUserRequest } from 'store/actions/session'
import { selectSessionRequestState } from 'store/selectors/session'

import { selectRouterLocation } from 'store/selectors/router'

import LoginFormContainer from './LoginFormContainer'
import { selectSessionIsLoggedIn, selectSessionPrompt } from 'store/selectors/session'

const mapStateToProps = state => {
  return {
    loading: selectSessionRequestState(state),
    location: selectRouterLocation(state),
    isLoggedIn: selectSessionIsLoggedIn(state),
    isRefreshing: selectSessionPrompt(state)
  }
}

const mapDispatchToProps = {
  loginUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)

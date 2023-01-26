import { connect } from 'react-redux'

import { logoutUserRequest } from 'store/actions/session'

import { selectRouterLocation } from 'store/selectors/router'

import LogoutContainer from './LogoutContainer'

const mapStateToProps = state => {
  return {
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  logoutUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer)

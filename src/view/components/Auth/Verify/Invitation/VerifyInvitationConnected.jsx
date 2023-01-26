import { connect } from 'react-redux'

import { verifyInvitationRequest } from 'store/actions/session'

import { selectRouterLocation } from 'store/selectors/router'

import VerifyInvitationContainer from './VerifyInvitationContainer'

const mapStateToProps = state => {
  return {
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  verifyRequest: verifyInvitationRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyInvitationContainer)

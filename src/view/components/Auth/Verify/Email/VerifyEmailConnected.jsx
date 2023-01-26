import { connect } from 'react-redux'

import { verifyEmailRequest } from 'store/actions/session'

import { selectRouterLocation } from 'store/selectors/router'

import VerifyEmailContainer from './VerifyEmailContainer'

const mapStateToProps = state => {
  return {
    location: selectRouterLocation(state)
  }
}

const mapDispatchToProps = {
  verifyRequest: verifyEmailRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailContainer)

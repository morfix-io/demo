import { connect } from 'react-redux'
import { refreshTokenRequest } from 'store/actions/session'
import RefreshWrapperContainer from './RefreshWrapperContainer'
import { selectSessionPrompt, selectSessionRequestState } from 'store/selectors/session'
import { selectUser } from 'store/selectors/user'

const mapStateToProps = state => {
  return {
    user: selectUser(state),
    prompt: selectSessionPrompt(state),
    loading: selectSessionRequestState(state)
  }
}

const mapDispatchToProps = {
  refreshTokenRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshWrapperContainer)

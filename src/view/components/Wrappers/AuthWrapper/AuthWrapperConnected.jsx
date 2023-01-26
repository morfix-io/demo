import { connect } from 'react-redux'
import { getUserDataRequest } from 'store/actions/user'
import AuthWrapperContainer from './AuthWrapperContainer'
import { selectSessionIsLoggedIn } from 'store/selectors/session'
import { selectOrganizationCurrent, selectOrganizations } from 'store/selectors/organization'
import { getUserOrganizationsRequest, setActiveOrganizationRequest } from 'store/actions/organization'
import { selectUser } from 'store/selectors/user'

const mapStateToProps = state => {
  return {
    user: selectUser(state),
    isLoggedIn: selectSessionIsLoggedIn(state),
    currentOrganization: selectOrganizationCurrent(state),
    organizations: selectOrganizations(state)
  }
}

const mapDispatchToProps = {
  getUserDataRequest,
  getUserOrganizationsRequest,
  setActiveOrganizationRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapperContainer)

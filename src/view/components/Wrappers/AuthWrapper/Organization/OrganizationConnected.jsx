import { connect } from 'react-redux'
import { getUserOrganizationsRequest, setActiveOrganizationRequest } from 'store/actions/organization'
import OrganizationContainer from './OrganizationContainer'
import { selectOrganizationCurrent, selectOrganizations } from 'store/selectors/organization'

const mapStateToProps = state => {
  return {
    currentOrganization: selectOrganizationCurrent(state),
    organizations: selectOrganizations(state)
  }
}

const mapDispatchToProps = {
  getUserOrganizationsRequest,
  setActiveOrganizationRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationContainer)

import { connect } from 'react-redux'
import { reportErrorRequest } from 'store/actions/reporter'

import ErrorBoundaryContainer from './ErrorBoundaryContainer'

const mapDispatchToProps = {
  reportErrorRequest
}

export default connect(null, mapDispatchToProps)(ErrorBoundaryContainer)

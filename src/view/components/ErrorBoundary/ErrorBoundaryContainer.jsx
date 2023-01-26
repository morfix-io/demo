import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundaryContainer extends PureComponent {
  state = {
    error: ''
  }

  static getDerivedStateFromError(error) {
    return {
      error: error.message
    }
  }

  componentDidCatch(error) {
    this.props.reportErrorRequest(error)
  }

  render() {
    return this.state.error ? 'Unknown error occurred. Try again later' : this.props.children
  }
}

ErrorBoundaryContainer.propTypes = {
  reportErrorRequest: PropTypes.func.isRequired,
  children: PropTypes.any
}

export default ErrorBoundaryContainer

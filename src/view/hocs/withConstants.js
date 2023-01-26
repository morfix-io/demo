import React, { PureComponent } from 'react'
import Shared from 'view/providers/Shared'

export default Component => {
  class WrappedComponent extends PureComponent {
    render() {
      return (
        <Shared.Consumer>
          {({ constants }) => {
            return <Component {...this.props} constants={constants} />
          }}
        </Shared.Consumer>
      )
    }
  }
  const displayName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withConstants(${displayName})`

  return WrappedComponent
}

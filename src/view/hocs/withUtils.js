import React, { PureComponent } from 'react'
import Shared from 'view/providers/Shared'

export default methods => Component => {
  class WrappedComponent extends PureComponent {
    selectUtilMethodsByNames = utils => (agg, name) => {
      return {
        ...agg,
        [name]: utils[name]
      }
    }

    render() {
      return (
        <Shared.Consumer>
          {({ utils }) => {
            const methodsNames = Array.isArray(methods) ? methods : [methods]
            const methodsFns = methodsNames.reduce(this.selectUtilMethodsByNames(utils), {})

            return <Component {...this.props} {...methodsFns} />
          }}
        </Shared.Consumer>
      )
    }
  }
  const displayName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withUtils(${displayName})`

  return WrappedComponent
}

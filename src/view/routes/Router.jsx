import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import MainLoader from 'view/common/MainLoader'
import { unauthenticatedRoutes } from '../routes'

const Router = props => {
  const { history } = props
  return (
    <Suspense fallback={<MainLoader />}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={unauthenticatedRoutes.HOME.path} exact component={unauthenticatedRoutes.HOME.component} />
        </Switch>
      </ConnectedRouter>
    </Suspense>
  )
}

Router.propTypes = {
  history: PropTypes.object.isRequired
}

export default Router

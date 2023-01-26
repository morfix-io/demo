import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainLoader from 'view/common/MainLoader'
import { unauthenticatedRoutes, errorRoutes } from '../routes'
import config from 'config'

const Router = props => {
  const { history } = props
  return (
    <Suspense fallback={<MainLoader />}>
      <ConnectedRouter history={history}>
        <Switch>
          {/*Auto attempt to redirect to the sandbox */}
          <Redirect exact from={`/`} to={unauthenticatedRoutes.SANDBOX.path} />
          <Redirect exact from={`${config.ROUTES.BASE}/`} to={unauthenticatedRoutes.SANDBOX.path} />
          {/* Unauth routes */}
          <Route path={unauthenticatedRoutes.SANDBOX.path} exact component={unauthenticatedRoutes.SANDBOX.component} />
          {/* If no route is matched, show 404 */}
          <Route component={errorRoutes.PAGE404.component} />
        </Switch>
      </ConnectedRouter>
    </Suspense>
  )
}

Router.propTypes = {
  history: PropTypes.object.isRequired
}

export default Router

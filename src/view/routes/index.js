import React from 'react'

import Apps from '@material-ui/icons/Apps'
import config from 'config'

import Page404 from '../pages/Auth/Page404'
import SandboxPage from '../pages/Sandbox'

export const errorRoutes = {
  PAGE404: {
    id: `${config.ROUTES.PAGE404}`,
    path: `${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.PAGE404}`,
    component: Page404
  }
}

export const unauthenticatedRoutes = {
  SANDBOX: {
    id: `${config.ROUTES.SANDBOX}`,
    path: `${config.ROUTES.BASE}/${config.ROUTES.SANDBOX}`,
    icon: <Apps />,
    component: SandboxPage
  }
}

export default {
  unauthenticatedRoutes,
  errorRoutes
}

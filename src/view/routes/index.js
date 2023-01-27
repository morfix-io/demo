import React from 'react'
import Apps from '@material-ui/icons/Apps'
import config from 'config'
import SandboxPage from '../pages/Sandbox'

export const unauthenticatedRoutes = {
  HOME: {
    id: `${config.ROUTES.HOME}`,
    path: `${config.ROUTES.HOME}`,
    icon: <Apps />,
    component: SandboxPage
  }
}

export default {
  unauthenticatedRoutes
}

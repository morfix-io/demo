import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import session, { initialState as sessionInitialState } from 'store/reducers/session'

import user, { initialState as userInitialState } from 'store/reducers/user'

import project, { initialState as projectInitialState } from 'store/reducers/project'

import team, { initialState as teamInitialState } from 'store/reducers/team'

import organization, { initialState as organizationInitialState } from 'store/reducers/organization'

import api, { initialState as apiInitialState } from 'store/reducers/api'

import key, { initialState as keyInitialState } from 'store/reducers/key'

import ui, { initialState as uiInitialState } from 'store/reducers/ui'

import morfix, { initialState as morfixInitialState } from 'store/reducers/morfix'

import engine, { initialState as engineInitialState } from 'store/reducers/engine'

export const createRootReducer = history => {
  return combineReducers({
    session,
    user,
    organization,
    project,
    team,
    api,
    key,
    ui,
    morfix,
    engine,
    router: connectRouter(history)
  })
}

export const initialState = {
  session: sessionInitialState,
  user: userInitialState,
  team: teamInitialState,
  project: projectInitialState,
  organization: organizationInitialState,
  api: apiInitialState,
  key: keyInitialState,
  ui: uiInitialState,
  morfix: morfixInitialState,
  engine: engineInitialState
}

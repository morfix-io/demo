import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { HelmetProvider } from 'react-helmet-async'

import Router from 'view/routes/Router'
import dark from 'view/theme/theme.dark'
import ErrorBoundaryConnected from 'view/components/ErrorBoundary'
import Shared from 'view/providers/Shared'
import PreferencesWrapperConnected from 'view/components/Wrappers/PreferencesWrapper'

const App = props => {
  const { history, store, utils, constants } = props

  return (
    <Provider store={store}>
      <CssBaseline>
        <Shared.Provider shared={{ utils, constants }}>
          <ErrorBoundaryConnected>
            <ThemeProvider theme={dark}>
              <PreferencesWrapperConnected>
                <HelmetProvider>
                  <Router history={history} />
                </HelmetProvider>
              </PreferencesWrapperConnected>
            </ThemeProvider>
          </ErrorBoundaryConnected>
        </Shared.Provider>
      </CssBaseline>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  utils: PropTypes.object.isRequired,
  constants: PropTypes.object.isRequired
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const initViewLayer = ({ store: { history, store }, utils, constants }) => {
  const root = document.getElementById('root')

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default
      ReactDOM.render(<NextApp constants={constants} utils={utils} history={history} store={store} />, root)
    })
  }

  return {
    render: () => {
      const hasChildNodes = root.hasChildNodes()

      if (hasChildNodes) {
        ReactDOM.hydrate(<App constants={constants} utils={utils} history={history} store={store} />, root)
        return
      }
      ReactDOM.render(<App constants={constants} utils={utils} history={history} store={store} />, root)
    }
  }
}

export default {
  init: initViewLayer
}

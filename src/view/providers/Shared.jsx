import React from 'react'
import PropTypes from 'prop-types'

const Context = React.createContext({})

const Consumer = Context.Consumer

const Provider = ({ children, shared }) => {
  return <Context.Provider value={shared}>{children}</Context.Provider>
}

Provider.propTypes = {
  shared: PropTypes.object,
  children: PropTypes.any
}

export default { Provider, Consumer }

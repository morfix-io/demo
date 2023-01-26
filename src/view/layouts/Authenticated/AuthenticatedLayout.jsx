import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  }
}))

const AuthenticatedLayout = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.any
}

export default AuthenticatedLayout

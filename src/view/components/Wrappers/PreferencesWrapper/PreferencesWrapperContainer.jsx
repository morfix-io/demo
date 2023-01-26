import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Localization from './Localization'
import Notifications from './Notifications'

const useStyles = makeStyles(() => ({
  webContainer: {
    height: '100vh',
    minWidth: 200
  }
}))

const Preferences = props => {
  const { children, preferences } = props
  const classes = useStyles()

  return (
    <Localization language={preferences.selectedLanguage}>
      <Fragment>
        <Notifications />
        <div className={classes.webContainer}>{children}</div>
      </Fragment>
    </Localization>
  )
}

Preferences.propTypes = {
  preferences: PropTypes.shape({
    selectedLanguage: PropTypes.string
  }),
  children: PropTypes.any
}

export default Preferences

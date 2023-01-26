import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import LogoutCard from './LogoutCard'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const LoginForm = props => {
  const classes = useStyles()
  const { logoutUserRequest, location } = props

  // On mount, perform logout
  useEffect(() => {
    logoutUserRequest()
  })

  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <LogoutCard location={location} />
          </Grid>
        </Grid>
      </main>
    </Fragment>
  )
}

LoginForm.propTypes = {
  logoutUserRequest: PropTypes.func.isRequired,
  location: PropTypes.any
}

export default withConstants(LoginForm)

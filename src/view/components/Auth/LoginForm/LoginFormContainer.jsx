import React, { useState, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import withConstants from 'view/hocs/withConstants'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import LoginCard from './LoginCard'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const LoginForm = props => {
  const classes = useStyles()
  const [state, setState] = useState({ email: '', password: '' })

  const {
    loginUserRequest,
    location,
    loading,
    isLoggedIn,
    isRefreshing,
    constants: { getValidRedirect }
  } = props

  const handleChange = useCallback(
    field => e => {
      setState({
        ...state,
        [field]: e.target.value
      })
    },
    [state]
  )

  const onSubmit = useCallback(
    e => {
      e.preventDefault()

      loginUserRequest({
        email: state.email,
        password: state.password,
        redirect: getValidRedirect(location.query.redirect)
      })
    },
    [state.email, state.password, loginUserRequest, getValidRedirect, location.query.redirect]
  )

  // If we are logged in and NOT refreshing, then continue the redirect
  if (isLoggedIn && !isRefreshing) {
    return <Redirect to={getValidRedirect(location.query.redirect)} />
  }
  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <LoginCard
              email={state.email}
              password={state.password}
              onEmailChange={handleChange('email')}
              onPasswordChange={handleChange('password')}
              onSubmit={onSubmit}
              loading={loading}
              location={location}
            />
          </Grid>
        </Grid>
      </main>
    </Fragment>
  )
}

LoginForm.propTypes = {
  loginUserRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  statusCode: PropTypes.number,
  constants: PropTypes.any,
  location: PropTypes.any,
  isLoggedIn: PropTypes.bool,
  isRefreshing: PropTypes.bool
}

export default withConstants(LoginForm)

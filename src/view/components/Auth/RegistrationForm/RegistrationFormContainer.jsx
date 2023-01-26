import React, { useState, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import RegistrationCard from './RegistrationCard'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const RegistrationForm = props => {
  const {
    registerUserRequest,
    loading,
    location,
    constants: { getValidRedirect }
  } = props

  const classes = useStyles()
  const [state, setState] = useState({ email: '', organizationName: '', password: '' })

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

      registerUserRequest({
        email: state.email,
        organizationName: state.organizationName,
        password: state.password,
        redirect: getValidRedirect(location.query.redirect)
      })
    },
    [
      state.email,
      state.organizationName,
      state.password,
      registerUserRequest,
      getValidRedirect,
      location.query.redirect
    ]
  )

  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <RegistrationCard
              email={state.email}
              organizationName={state.organizationName}
              password={state.password}
              onEmailChange={handleChange('email')}
              onOrganizationNameChange={handleChange('organizationName')}
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

RegistrationForm.propTypes = {
  registerUserRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  statusCode: PropTypes.number,
  constants: PropTypes.any,
  location: PropTypes.any
}

export default withConstants(RegistrationForm)

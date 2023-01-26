import React, { useState, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import ForgotPasswordCard from './ForgotPasswordCard'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const ForgotForm = props => {
  const classes = useStyles()
  const [state, setState] = useState({ email: '' })

  const { forgotPasswordRequest } = props

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

      forgotPasswordRequest({
        email: state.email
      })
    },
    [state.email, forgotPasswordRequest]
  )

  const { loading, location } = props

  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <ForgotPasswordCard
              email={state.email}
              onEmailChange={handleChange('email')}
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

ForgotForm.propTypes = {
  forgotPasswordRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  statusCode: PropTypes.number,
  constants: PropTypes.any,
  location: PropTypes.any
}

export default withConstants(ForgotForm)

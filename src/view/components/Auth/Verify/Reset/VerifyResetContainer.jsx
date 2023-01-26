import React, { Fragment, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import VerifyCard from '../VerifyCard'
import queryString from 'query-string'
import BasicForm from './BasicForm'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const VerifyReset = props => {
  const { verifyRequest, loading, location } = props
  const { tkn } = queryString.parse(location.search)

  const [state, setState] = useState({ password: '' })

  const handleChange = useCallback(
    field => e => {
      setState({
        ...state,
        [field]: e.target.value
      })
    },
    [state]
  )
  const classes = useStyles()

  // Submit handler
  const onSubmit = useCallback(
    e => {
      e.preventDefault()

      verifyRequest({
        tkn,
        password: state.password
      })
    },
    [tkn, state.password, verifyRequest]
  )

  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <VerifyCard formName={'reset_verification'}>
              <BasicForm
                password={state.password}
                onPasswordChange={handleChange('password')}
                loading={loading}
                onSubmit={onSubmit}
              />
            </VerifyCard>
          </Grid>
        </Grid>
      </main>
    </Fragment>
  )
}

VerifyReset.propTypes = {
  verifyRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}

export default VerifyReset

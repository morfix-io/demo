import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import VerifyCard from '../VerifyCard'
import queryString from 'query-string'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const VerifyEmail = props => {
  const { verifyRequest, location } = props
  const { tkn } = queryString.parse(location.search)

  const classes = useStyles()

  useEffect(() => {
    if (tkn) {
      verifyRequest({
        tkn
      })
    }
  }, [tkn, verifyRequest])

  return (
    <Fragment>
      <main className={classes.main}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <VerifyCard formName={'email_verification'} />
          </Grid>
        </Grid>
      </main>
    </Fragment>
  )
}

VerifyEmail.propTypes = {
  verifyRequest: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default VerifyEmail

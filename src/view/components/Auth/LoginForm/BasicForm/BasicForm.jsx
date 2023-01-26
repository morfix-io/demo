import React from 'react'
import PropTypes from 'prop-types'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { path } from 'view/components/Auth/util'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import config from 'config'

const useStyles = makeStyles(theme => ({
  submit: {
    marginTop: theme.spacing(4)
  },
  input: {
    color: theme.palette.primary.dark
  },
  inputLabel: {
    color: lighten(theme.palette.primary.light, 0.2)
  },
  underline: {
    '&:before': {
      borderBottomColor: lighten(theme.palette.primary.light, 0.2)
    },
    '&:hover:before': {
      // borderBottomColor: theme.palette.primary.light
      borderBottomColor: 'blue'
    }
  }
}))

const BasicForm = props => {
  const { email, loading, password, onSubmit, onEmailChange, onPasswordChange, location } = props
  const classes = useStyles()

  const query = path(location.query.redirect)

  const inputStyleOverrides = {
    InputLabelProps: {
      classes: {
        root: classes.inputLabel
      }
    },
    InputProps: {
      classes: {
        root: classes.input,
        underline: classes.underline
      },
      inputMode: 'numeric'
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="standard-email-input"
        autoComplete="username"
        type="email"
        name="email"
        autoFocus
        value={email}
        label={<FormattedMessage id={'email'} />}
        helperText=""
        fullWidth
        variant="standard"
        margin="normal"
        onChange={onEmailChange}
        {...inputStyleOverrides}
      />
      <TextField
        id="standard-password-input"
        autoComplete="current-password"
        type="password"
        name="password"
        value={password}
        label={<FormattedMessage id={'password'} />}
        helperText=""
        fullWidth
        variant="standard"
        margin="normal"
        onChange={onPasswordChange}
        {...inputStyleOverrides}
      />
      <Grid className={classes.submit} container item alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button
            id={'BUTTON-login'}
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={loading || !email || !password}
          >
            <Typography id={'BUTTON-login-text'} variant="button" display="block">
              <FormattedMessage id={'sign_in'} />
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            id={'LINK-forgot-password'}
            color="default"
            component={Link}
            className={classes.button}
            to={`${config.ROUTES.BASE}/${config.ROUTES.AUTH}/${config.ROUTES.FORGOT}${query}`}
          >
            <Typography id={'LINK-forgot-password-text'} variant="button" display="block">
              <FormattedMessage id={'forgot_password'} />
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

BasicForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.any
}

export default BasicForm

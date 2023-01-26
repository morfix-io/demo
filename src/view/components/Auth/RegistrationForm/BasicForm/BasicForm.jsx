import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import { lighten } from '@material-ui/core/styles/colorManipulator'

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
  const {
    email,
    organizationName,
    password,
    loading,
    onSubmit,
    onEmailChange,
    onOrganizationNameChange,
    onPasswordChange
  } = props
  const classes = useStyles()

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
        autoComplete="new-username"
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
        id="standard-orgname-input"
        autoComplete="new-organization"
        type="text"
        name="text"
        value={organizationName}
        label={<FormattedMessage id={'organization_name'} />}
        helperText={<FormattedMessage id={'organization_hint'} />}
        fullWidth
        variant="standard"
        margin="normal"
        onChange={onOrganizationNameChange}
        {...inputStyleOverrides}
      />
      <TextField
        id="standard-password-input"
        autoComplete="new-password"
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
            id={'BUTTON-sign-up'}
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={loading || !email || !organizationName || !password}
          >
            <Typography id={'BUTTON-sign-up-text'} variant="button" display="block">
              <FormattedMessage id={'sign_up'} />
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

BasicForm.propTypes = {
  email: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onOrganizationNameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.any
}

export default BasicForm

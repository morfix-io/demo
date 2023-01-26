import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Grid } from '@material-ui/core'
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
  const { email, loading, onSubmit, onEmailChange } = props
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
        autoComplete="current-username"
        type="email"
        name="email"
        autoFocus
        value={email}
        label={<FormattedMessage id={'email'} />}
        fullWidth
        variant="standard"
        margin="normal"
        onChange={onEmailChange}
        {...inputStyleOverrides}
      />
      <Grid className={classes.submit} container item alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={loading || !email}
          >
            <FormattedMessage id={'submit'} />
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

BasicForm.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.any
}

export default BasicForm

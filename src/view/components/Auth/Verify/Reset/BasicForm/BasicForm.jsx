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
      borderBottomColor: theme.palette.primary.dark
    }
  }
}))

const BasicForm = props => {
  const { password, loading, onSubmit, onPasswordChange } = props

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
        id="standard-password-input"
        autoComplete="new-password"
        type="password"
        name="password"
        value={password}
        label={<FormattedMessage id={'new_password'} />}
        fullWidth
        variant="standard"
        margin="normal"
        onChange={onPasswordChange}
        {...inputStyleOverrides}
      />
      <Grid className={classes.submit} container item alignItems="center" justifyContent="space-between">
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading || !password}
          >
            <FormattedMessage id={'submit'} />
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

BasicForm.propTypes = {
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default BasicForm

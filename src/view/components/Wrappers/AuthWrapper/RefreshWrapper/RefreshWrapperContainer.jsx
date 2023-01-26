import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import SharedDialog from 'view/common/SharedDialog'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class RefreshWrapperContainer extends PureComponent {
  state = {
    password: ''
  }

  onPasswordChange = event => {
    const { value } = event.target
    this.setState({ password: value })
  }

  onSubmit = e => {
    e.preventDefault()
    const { refreshTokenRequest, user } = this.props
    const { password } = this.state

    refreshTokenRequest({
      email: user.email,
      password
    })

    this.setState({
      password: ''
    })
  }

  render() {
    const { classes, prompt, loading, intl, children } = this.props
    const { password } = this.state
    return (
      <Fragment>
        <SharedDialog
          id={'reauthenticate'}
          open={prompt}
          title={intl.formatMessage({ id: 'reauthenticate' })}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          content={
            <Fragment>
              <form id={'reauthenticate'} autoComplete="current-password" onSubmit={this.onSubmit}>
                <DialogContentText>{intl.formatMessage({ id: 'added_security' })}</DialogContentText>
                <TextField
                  id="current-password"
                  autoFocus
                  fullWidth
                  label={intl.formatMessage({ id: 'password' })}
                  className={classes.textField}
                  type="password"
                  name="password"
                  margin="normal"
                  value={password}
                  onChange={this.onPasswordChange}
                />
              </form>
            </Fragment>
          }
          actions={
            <Button
              id={'reauthenticate'}
              type={'submit'}
              color="primary"
              disabled={loading || !password}
              onClick={this.onSubmit}
            >
              {intl.formatMessage({ id: 'submit' })}
            </Button>
          }
        />
        {children}
      </Fragment>
    )
  }
}

RefreshWrapperContainer.propTypes = {
  refreshTokenRequest: PropTypes.func.isRequired,
  prompt: PropTypes.bool.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.any
}

export default compose(withStyles(styles), injectIntl)(RefreshWrapperContainer)

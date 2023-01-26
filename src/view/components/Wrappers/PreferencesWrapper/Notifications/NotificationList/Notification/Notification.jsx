import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import { Typography } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import ErrorIcon from '@material-ui/icons/Error'
import CheckIcon from '@material-ui/icons/CheckCircle'
import withConstants from 'view/hocs/withConstants'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

class Notification extends PureComponent {
  state = {
    open: true
  }

  getFormat = () => {
    const { notification, classes, constants } = this.props
    switch (notification.type) {
      case constants.NOTIFICATION_TYPES.SUCCESS:
        return {
          icon: <CheckIcon id={`NOTIFY ${notification.message}`} color="inherit" className={classes.iconVariant} />,
          position: {
            vertical: 'top',
            horizontal: 'right'
          },
          snackClass: classes.success
        }
      case constants.NOTIFICATION_TYPES.ERROR:
        return {
          icon: <ErrorIcon id={`NOTIFY ${notification.message}`} color="inherit" className={classes.iconVariant} />,
          position: {
            vertical: 'top',
            horizontal: 'center'
          },
          snackClass: classes.error
        }
      default:
        return {
          icon: <ErrorIcon id={`NOTIFY ${notification.message}`} color="inherit" className={classes.iconVariant} />,
          position: {
            vertical: 'top',
            horizontal: 'center'
          },
          snackClass: classes.error
        }
    }
  }

  onClose = (_event, reason) => {
    if (reason !== 'clickaway') {
      this.setState({
        open: false
      })
    }
  }

  render() {
    const { notification, classes } = this.props
    const { open } = this.state

    const { icon, position, snackClass } = this.getFormat()
    return (
      <Snackbar
        id={`NOTIFY-${notification.message}`}
        open={open}
        anchorOrigin={position}
        autoHideDuration={5000}
        onClose={this.onClose}
      >
        <SnackbarContent
          id={`NOTIFY-${notification.message}-contentt`}
          className={snackClass}
          classes={{
            root: classes.root,
            message: classes.message
          }}
          message={
            <div id={`NOTIFY-${notification.message}-msg`} className={classes.message}>
              {icon}
              <Typography id={`NOTIFY-${notification.message}-msg-text`} variant="subtitle1">
                {notification.message}
              </Typography>
            </div>
          }
          action={[
            <IconButton
              id={`NOTIFY-close-${notification.message}-btn`}
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.onClose}
            >
              <CloseIcon id={`NOTIFY-close-${notification.message}-btn-icon`} className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string,
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    statusCode: PropTypes.number.isRequired
  }),
  onClose: PropTypes.func.isRequired,
  constants: PropTypes.shape({
    NOTIFICATION_TYPES: PropTypes.object.isRequired
  }).isRequired
}

export default compose(withStyles(styles), withConstants, injectIntl)(Notification)

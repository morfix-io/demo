import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import styles from './styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

const SharedDialog = props => {
  const {
    id,
    onClose,
    open,
    title,
    content,
    actions,
    disableBackdropClick,
    disableEscapeKeyDown,
    onBackdropClick,
    onEscapeKeyDown
  } = props
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={id}
      disableBackdropClick={Boolean(disableBackdropClick)}
      disableEscapeKeyDown={Boolean(disableEscapeKeyDown)}
      onBackdropClick={onBackdropClick}
      onEscapeKeyDown={onEscapeKeyDown}
    >
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}

SharedDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired
}

export default compose(withStyles(styles))(SharedDialog)

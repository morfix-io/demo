import React, { Component } from 'react'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { compose } from 'redux'
import Typography from '@material-ui/core/Typography'
import { injectIntl } from 'react-intl'

class DropzoneContainer extends Component {
  onInputClick = event => {
    event.target.value = ''
  }

  render() {
    const { classes, intl, disabled, label, onFilesAdded, color, variant } = this.props
    return (
      <div>
        <input
          id={`file-upload-${label}`}
          className={classes.fileInput}
          // accept={"text/plain"}
          type="file"
          onChange={onFilesAdded}
          onClick={this.onInputClick}
          disabled={disabled}
        />
        <label htmlFor={`file-upload-${label}`}>
          <Button variant={variant} color={color} component="span" disabled={disabled}>
            <Typography id={`UPLOAD ${label}`} variant="button" display="block">
              {`${intl.formatMessage({ id: 'upload' })}`}
            </Typography>
          </Button>
        </label>
      </div>
    )
  }
}

export default compose(withStyles(styles), injectIntl)(DropzoneContainer)

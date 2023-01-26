import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'

class DropzoneContainer extends Component {
  onInputClick = event => {
    event.target.value = ''
  }

  render() {
    const { classes, component, disabled, label, onFilesAdded } = this.props
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
        <label htmlFor={`file-upload-${label}`}>{component}</label>
      </div>
    )
  }
}

export default compose(withStyles(styles), injectIntl)(DropzoneContainer)

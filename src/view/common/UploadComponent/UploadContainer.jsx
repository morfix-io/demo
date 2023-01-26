import React, { PureComponent } from 'react'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import UploadInput from './UploadInput'

class UploadContainer extends PureComponent {
  onUploaded = data => {
    const { onUploaded } = this.props
    onUploaded(data)
  }

  onFilesAdded = async e => {
    const { length, ...filesObj } = e.target.files
    const files = Object.entries(filesObj).map(([key, value]) => value)
    const reader = new FileReader()

    const result = await new Promise((resolve, reject) => {
      reader.onload = e => {
        const { result } = e.target
        const name = files[0].name
        const lines = result.split('\n')
        const header = lines.slice(0, 2)
        const version = header.slice(1, 2).pop().split(' ')[1]
        const data = lines.slice(3, -1)
        resolve({ name, version, data })
      }
      reader.onabort = e => {
        reject(e)
      }
      reader.onerror = e => {
        reject(e)
      }

      reader.readAsText(files[0])
    })
    this.onUploaded(result)
  }

  render() {
    const { classes, disabled, label, component } = this.props
    return (
      <div className={classes.root}>
        <UploadInput onFilesAdded={this.onFilesAdded} disabled={disabled} label={label} component={component} />
      </div>
    )
  }
}

export default compose(withStyles(styles), withConstants, injectIntl)(UploadContainer)

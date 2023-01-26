import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    // eslint-disable-next-line no-unused-vars
    const { _, ...filesObj } = e.target.files
    const files = Object.entries(filesObj).map(([_, value]) => value)
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
    const { classes, disabled, label, color, variant } = this.props
    return (
      <div className={classes.root}>
        <UploadInput
          onFilesAdded={this.onFilesAdded}
          disabled={disabled}
          label={label}
          color={color}
          variant={variant}
        />
      </div>
    )
  }
}

UploadContainer.propTypes = {
  encParm: PropTypes.shape({
    schemeType: PropTypes.string.isRequired,
    securityLevel: PropTypes.string.isRequired,
    polyModulusDegree: PropTypes.string.isRequired,
    bitSize: PropTypes.number.isRequired,
    bitSizes: PropTypes.string.isRequired,
    expandModChain: PropTypes.bool.isRequired
  }),
  morfixCreateEncParmsRequest: PropTypes.func.isRequired,
  morfixCreateContextRequest: PropTypes.func.isRequired,
  morfixCreateKeyGeneratorRequest: PropTypes.func.isRequired,
  morfixGeneratePublicKeyRequest: PropTypes.func.isRequired,
  morfixGenerateSecretKeyRequest: PropTypes.func.isRequired,
  morfixGenerateRelinKeyRequest: PropTypes.func.isRequired,
  morfixGenerateGaloisKeyRequest: PropTypes.func.isRequired
}

export default compose(withStyles(styles), withConstants, injectIntl)(UploadContainer)

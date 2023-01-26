import Tooltip from '@material-ui/core/Tooltip'
import copy from 'clipboard-copy'
import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
class CopyToClipboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showTooltip: false
    }
  }

  onCopy = async content => {
    await copy(content)
    this.setState({ showTooltip: true })
  }

  handleOnTooltipClose = () => {
    this.setState({ showTooltip: false })
  }

  render() {
    const { children } = this.props

    const { showTooltip } = this.state

    return (
      <Tooltip
        open={showTooltip}
        title={<FormattedMessage id={'copied_to_clipboard'} />}
        leaveDelay={1500}
        onClose={this.handleOnTooltipClose}
      >
        {children({ copy: this.onCopy })}
      </Tooltip>
    )
  }
}

export default CopyToClipboard

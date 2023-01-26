import Tooltip from '@material-ui/core/Tooltip'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */

const TooltipArrow = ({ children, title, placement }) => {
  return (
    <Tooltip title={title} placement={placement} arrow={true} leaveDelay={500}>
      {children}
    </Tooltip>
  )
}
TooltipArrow.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  placement: PropTypes.string
}

export default TooltipArrow

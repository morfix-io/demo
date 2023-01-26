import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Snackbar from './Notification'

const NotificationList = props => {
  const { notifications, onClose } = props

  const closeNotification = payload => () => onClose(payload)

  return (
    <Fragment>
      {notifications.map(notification => (
        <Snackbar
          id={`NOTIFY ${notification.message}`}
          key={notification.id}
          onClose={closeNotification(notification)}
          notification={notification}
        />
      ))}
    </Fragment>
  )
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      statusCode: PropTypes.number.isRequired
    })
  ),
  onClose: PropTypes.func.isRequired
}

export default NotificationList

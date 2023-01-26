import React from 'react'
import PropTypes from 'prop-types'

import NotificationList from './NotificationList'

const Notifications = props => {
  const { notifications, closeNotificationRequest } = props
  return <NotificationList onClose={closeNotificationRequest} notifications={notifications} />
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      statusCode: PropTypes.number.isRequired
    })
  ),
  closeNotificationRequest: PropTypes.func.isRequired
}

export default Notifications

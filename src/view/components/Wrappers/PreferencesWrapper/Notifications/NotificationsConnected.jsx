import { connect } from 'react-redux'
import { selectNotifications } from 'store/selectors/ui'
import { closeNotificationRequest } from 'store/actions/ui'

import NotificationsContainer from './NotificationsContainer'

const mapStateToProps = state => {
  return {
    notifications: selectNotifications(state)
  }
}

const mapDispatchToProps = {
  closeNotificationRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)

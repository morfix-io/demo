import { connect } from 'react-redux'

import PreferencesWrapperContainer from './PreferencesWrapperContainer'
import { selectSessionPreferences } from 'store/selectors/session'

const mapStateToProps = state => {
  return {
    preferences: selectSessionPreferences(state)
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesWrapperContainer)

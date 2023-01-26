import { connect } from 'react-redux'
import { morfixEvaluatePlainModulusSwitchToNextRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import PlainModulusSwitchToNextContainer from './PlainModulusSwitchToNextContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluatePlainModulusSwitchToNextRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PlainModulusSwitchToNextContainer)

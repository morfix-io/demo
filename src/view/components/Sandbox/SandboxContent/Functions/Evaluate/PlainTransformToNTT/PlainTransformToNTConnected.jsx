import { connect } from 'react-redux'
import { morfixEvaluatePlainTransformToNTTRequest } from 'store/actions/morfix'

import { selectPlainTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import PlainTransformToNTTContainer from './PlainTransformToNTTContainer'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluatePlainTransformToNTTRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PlainTransformToNTTContainer)

import { connect } from 'react-redux'
import { morfixEvaluateRotateColumnsRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import RotateColumnsContainer from './RotateColumnsContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateRotateColumnsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RotateColumnsContainer)

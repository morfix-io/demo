import { connect } from 'react-redux'
import { morfixEvaluateRotateRowsRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import RotateRowsContainer from './RotateRowsContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateRotateRowsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RotateRowsContainer)

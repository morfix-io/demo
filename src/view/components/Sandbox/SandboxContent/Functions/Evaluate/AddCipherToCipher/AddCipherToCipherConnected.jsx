import { connect } from 'react-redux'
import { morfixEvaluateAddCipherToCipherRequest } from 'store/actions/morfix'

import { selectCipherTextById, selectMorfixEvaluator } from 'store/selectors/morfix'

import AddCipherToCipherContainer from './AddCipherToCipherContainer'

const mapStateToProps = state => {
  return {
    cipherTexts: selectCipherTextById(state),
    isEvaluatorReady: selectMorfixEvaluator(state)
  }
}

const mapDispatchToProps = {
  morfixEvaluateAddCipherToCipherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCipherToCipherContainer)

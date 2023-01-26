import { connect } from 'react-redux'
import { morfixBatchEncodeUint32Request } from 'store/actions/morfix'

import { selectMorfixBatchEncoder, selectPlainTextById } from 'store/selectors/morfix'

import Uint32Container from './Uint32Container'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isBatchEncoderReady: selectMorfixBatchEncoder(state)
  }
}

const mapDispatchToProps = {
  morfixBatchEncodeUint32Request
}

export default connect(mapStateToProps, mapDispatchToProps)(Uint32Container)

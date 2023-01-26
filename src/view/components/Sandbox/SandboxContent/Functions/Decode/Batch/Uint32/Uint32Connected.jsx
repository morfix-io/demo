import { connect } from 'react-redux'
import { morfixBatchDecodeUint32Request } from 'store/actions/morfix'

import { selectMorfixBatchEncoder, selectPlainTextById } from 'store/selectors/morfix'

import Uint32Container from './Uint32Container'

const mapStateToProps = state => {
  return {
    plainTexts: selectPlainTextById(state),
    isBatchEncoderReady: selectMorfixBatchEncoder(state)
  }
}

const mapDispatchToProps = {
  morfixBatchDecodeUint32Request
}

export default connect(mapStateToProps, mapDispatchToProps)(Uint32Container)

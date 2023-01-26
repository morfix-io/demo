import React, { PureComponent } from 'react'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import shortid from 'shortid'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import BatchEncodeInt32 from './Encode/Batch/Int32'
import BatchEncodeUint32 from './Encode/Batch/Uint32'
import CkksEncodeFloat64 from './Encode/Ckks/Float64'
import BatchDecodeInt32 from './Decode/Batch/Int32'
import BatchDecodeUint32 from './Decode/Batch/Uint32'
import CkksDecodeFloat64 from './Decode/Ckks/Float64'
import Encrypt from './Encrypt'
import Decrypt from './Decrypt'
import AddCipherToCipher from './Evaluate/AddCipherToCipher'
import AddPlainToCipher from './Evaluate/AddPlainToCipher'
import SubCipherFromCipher from './Evaluate/SubCipherFromCipher'
import SubPlainFromCipher from './Evaluate/SubPlainFromCipher'
import MultiplyCipherByCipher from './Evaluate/MultiplyCipherByCipher'
import MultiplyCipherByPlain from './Evaluate/MultiplyCipherByPlain'
import NegateCipher from './Evaluate/NegateCipher'
import SquareCipher from './Evaluate/SquareCipher'
import RelinearizeCipher from './Evaluate/RelinearizeCipher'
import ExponentiateCipher from './Evaluate/ExponentiateCipher'
import CipherModulusSwitchToNext from './Evaluate/CipherModulusSwitchToNext'
import PlainModulusSwitchToNext from './Evaluate/PlainModulusSwitchToNext'
import CipherRescaleToNext from './Evaluate/CipherRescaleToNext'
import PlainTransformToNTT from './Evaluate/PlainTransformToNTT'
import CipherTransformToNTT from './Evaluate/CipherTransformToNTT'
import CipherTransformFromNTT from './Evaluate/CipherTransformFromNTT'
import RotateRows from './Evaluate/RotateRows'
import RotateColumns from './Evaluate/RotateColumns'
import RotateVector from './Evaluate/RotateVector'
import ComplexConjugate from './Evaluate/ComplexConjugate'
import SumElements from './Evaluate/SumElements'
import DotProduct from './Evaluate/DotProduct'
import DotProductPlain from './Evaluate/DotProductPlain'

import { ACTION_STATUS } from 'shared/constants'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { genCode } from 'view/common/Code/code'
import CodeContainer from 'view/common/Code'

const ACTIONS = {
  BATCH_ENCODE_INT32: 'Batch Encode (Int32)',
  BATCH_ENCODE_UINT32: 'Batch Encode (Uint32)',
  CKKS_ENCODE_FLOAT64: 'Ckks Encode',
  BATCH_DECODE_INT32: 'Batch Decode (Int32)',
  BATCH_DECODE_UINT32: 'Batch Decode (Uint32)',
  CKKS_DECODE_FLOAT64: 'Ckks Decode',
  ENCRYPT: 'Encrypt',
  DECRYPT: 'Decrypt',
  ADD_CIPHER_TO_CIPHER: 'Add Two CipherTexts',
  ADD_PLAIN_TO_CIPHER: 'Add a PlainText to a CipherText',
  SUB_CIPHER_FROM_CIPHER: 'Subtract Two CipherTexts',
  SUB_PLAIN_FROM_CIPHER: 'Subtract a PlainText from a CipherText',
  MULTIPLY_CIPHER_BY_CIPHER: 'Multiply Two CipherTexts',
  MULTIPLY_CIPHER_BY_PLAIN: 'Multiply a CipherText by a PlainText',
  NEGATE_CIPHER: 'Negate a CipherText',
  SQUARE_CIPHER: 'Square a CipherText',
  RELINEARIZE_CIPHER: 'Relinearize a CipherText',
  BATCH_EXPONENITATE_CIPHER: 'Exponentiate a CipherText',
  CIPHER_MODULUS_SWITCH_TO_NEXT: 'Switch to Next Modulus (CipherText)',
  PLAIN_MODULUS_SWITCH_TO_NEXT: 'Switch to Next Modulus (PlainText)',
  CKKS_CIPHER_RESCALE_TO_NEXT: 'Rescale a CipherText',
  PLAIN_TRANSFORM_TO_NTT: 'Transform a PlainText to the NTT domain',
  CIPHER_TRANSFORM_TO_NTT: 'Transform a CipherText to the NTT domain',
  CIPHER_TRANSFORM_FROM_NTT: 'Transform a CipherText back from the NTT domain',
  BATCH_ROTATE_ROWS: "Rotate a CipherText's rows",
  BATCH_ROTATE_COLUMNS: "Rotate a CipherText's columns",
  CKKS_ROTATE_VECTOR: "Rotate a CipherText's vector",
  CKKS_COMPLEX_CONJUGATE: 'Perform a Complex Conjugate on a CipherText',
  SUM_ELEMENTS: 'Sum all elements of a CipherText',
  DOT_PRODUCT: 'Dot Product of two CipherTexts',
  DOT_PRODUCT_PLAIN: 'Dot Product of a CipherText and a PlainText'
}

const ACTION_COMPONENTS = {
  [ACTIONS.BATCH_ENCODE_INT32]: BatchEncodeInt32, // Only bfv
  [ACTIONS.BATCH_ENCODE_UINT32]: BatchEncodeUint32, // Only bfv
  [ACTIONS.CKKS_ENCODE_FLOAT64]: CkksEncodeFloat64, // Only ckks
  [ACTIONS.BATCH_DECODE_INT32]: BatchDecodeInt32, // Only bfv
  [ACTIONS.BATCH_DECODE_UINT32]: BatchDecodeUint32, // Only bfv
  [ACTIONS.CKKS_DECODE_FLOAT64]: CkksDecodeFloat64, // Only ckks
  [ACTIONS.ENCRYPT]: Encrypt,
  [ACTIONS.DECRYPT]: Decrypt,
  [ACTIONS.ADD_CIPHER_TO_CIPHER]: AddCipherToCipher,
  [ACTIONS.ADD_PLAIN_TO_CIPHER]: AddPlainToCipher,
  [ACTIONS.SUB_CIPHER_FROM_CIPHER]: SubCipherFromCipher,
  [ACTIONS.SUB_PLAIN_FROM_CIPHER]: SubPlainFromCipher,
  [ACTIONS.MULTIPLY_CIPHER_BY_CIPHER]: MultiplyCipherByCipher,
  [ACTIONS.MULTIPLY_CIPHER_BY_PLAIN]: MultiplyCipherByPlain,
  [ACTIONS.NEGATE_CIPHER]: NegateCipher,
  [ACTIONS.SQUARE_CIPHER]: SquareCipher,
  [ACTIONS.RELINEARIZE_CIPHER]: RelinearizeCipher,
  [ACTIONS.BATCH_EXPONENITATE_CIPHER]: ExponentiateCipher, // Only bfv
  [ACTIONS.CIPHER_MODULUS_SWITCH_TO_NEXT]: CipherModulusSwitchToNext,
  [ACTIONS.PLAIN_MODULUS_SWITCH_TO_NEXT]: PlainModulusSwitchToNext,
  [ACTIONS.CKKS_CIPHER_RESCALE_TO_NEXT]: CipherRescaleToNext, // Only ckks
  [ACTIONS.PLAIN_TRANSFORM_TO_NTT]: PlainTransformToNTT,
  [ACTIONS.CIPHER_TRANSFORM_TO_NTT]: CipherTransformToNTT,
  [ACTIONS.CIPHER_TRANSFORM_FROM_NTT]: CipherTransformFromNTT,
  [ACTIONS.BATCH_ROTATE_ROWS]: RotateRows, // Only bfv
  [ACTIONS.BATCH_ROTATE_COLUMNS]: RotateColumns, // Only bfv
  [ACTIONS.CKKS_ROTATE_VECTOR]: RotateVector, // Only ckks
  [ACTIONS.CKKS_COMPLEX_CONJUGATE]: ComplexConjugate, // Only ckks
  [ACTIONS.SUM_ELEMENTS]: SumElements,
  [ACTIONS.DOT_PRODUCT]: DotProduct,
  [ACTIONS.DOT_PRODUCT_PLAIN]: DotProductPlain
}

class FunctionsContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      codeOpen: false,
      code: [],
      api: {},
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  onClose = () => {
    this.setState({
      codeOpen: false
    })
  }

  onCreateAction = type => event => {
    event.preventDefault()

    const { morfixEngineCreateActionRequest } = this.props
    morfixEngineCreateActionRequest({
      actionId: shortid(),
      function: {},
      type
    })

    this.setState({
      anchorEl: null
    })
  }

  onUpdateAction = actionId => action => {
    const { morfixEngineUpdateActionRequest } = this.props
    morfixEngineUpdateActionRequest({
      actionId,
      function: {
        action: action.action,
        payload: {
          ...action.payload,
          actionId
        }
      }
    })
  }

  onDeleteAction = actionId => event => {
    event.preventDefault()
    const { morfixEngineDeleteActionRequest } = this.props

    morfixEngineDeleteActionRequest({
      actionId
    })
  }

  onExec = actionId => () => {
    const { morfixEngineExecuteAllActionsRequest } = this.props
    const { actionsAllIds, actionsById } = this.props
    const actionsInOrder = actionsAllIds.filter(x => x === actionId).map(x => actionsById[x])
    morfixEngineExecuteAllActionsRequest(actionsInOrder)
  }

  onExecAll = event => {
    event.preventDefault()
    const { morfixEngineExecuteAllActionsRequest } = this.props
    const { actionsAllIds, actionsById } = this.props
    const actionsInOrder = actionsAllIds.map(x => actionsById[x])
    morfixEngineExecuteAllActionsRequest(actionsInOrder)
  }

  onCreateCode = e => {
    e.preventDefault()
    const state = genCode(this.props)
    this.setState({
      ...this.state,
      ...state
    })
  }

  render() {
    const {
      classes,
      intl,
      encParm,
      actionsAllIds,
      actionsById,
      constants: { SCHEME_TYPES }
    } = this.props

    const { anchorEl, code, codeOpen } = this.state

    const actions = actionsAllIds.map(x => actionsById[x])
    const FctnComponents = actions.map(actn => {
      return {
        actionId: actn.actionId,
        type: actn.type,
        status: actn.status,
        function: actn.function || {},
        component: ACTION_COMPONENTS[ACTIONS[actn.type]]
      }
    })

    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {intl.formatMessage({ id: 'functions' })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'functions_description' })}
        </Typography>
        <Grid item direction="column" spacing={3} container justifyContent="center" alignItems="center">
          <Grid item className={classes.grid}>
            <List>
              {FctnComponents.map((Fctn, index) => (
                <ListItem key={index}>
                  {Fctn.status === ACTION_STATUS.SUCCESS && <CheckCircleIcon className={classes.iconSuccess} />}
                  {Fctn.status === ACTION_STATUS.FAILURE && <CancelIcon className={classes.iconFailure} />}
                  {(!Fctn.status || Fctn.status === ACTION_STATUS.UNKNOWN) && (
                    <RadioButtonUncheckedIcon className={classes.iconUnknown} />
                  )}
                  <Fctn.component
                    payload={Fctn.function && Fctn.function.payload ? Fctn.function.payload : {}}
                    onExec={this.onExec(Fctn.actionId)}
                    onUpdateAction={this.onUpdateAction(Fctn.actionId)}
                    encParm={encParm}
                  />
                  <ListItemSecondaryAction>
                    <IconButton className={classes.iconButton} edge="end" onClick={this.onDeleteAction(Fctn.actionId)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item container direction="row" spacing={3} justifyContent="center" alignItems="center">
            <Grid item>
              <Button
                id={'BUTTON-create-code'}
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.onCreateCode}
              >
                <Typography id={'BUTTON-create-code-text'} variant="button" display="block">
                  {intl.formatMessage({ id: 'create_code' })}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Fab id={'BUTTON-create-function'} variant="extended" className={classes.fab} onClick={this.handleClick}>
                <AddIcon id={'BUTTON-create-function-icon'} className={classes.extendedIcon} />
                <Typography id={'BUTTON-create-function-text'} variant="button" display="block">
                  {intl.formatMessage({ id: 'create_a_function' })}
                </Typography>
              </Fab>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                {Object.entries(ACTIONS).map(([key, value], index) => (
                  <MenuItem
                    id={`SELECTED-create-function-${value.replace(/[\W]+/g, '_')}`}
                    key={index}
                    value={key}
                    onClick={this.onCreateAction(key)}
                    disabled={
                      encParm.schemeType === 'select' ||
                      encParm.schemeType === SCHEME_TYPES.none ||
                      ((encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) &&
                        key.includes('CKKS')) ||
                      (encParm.schemeType === SCHEME_TYPES.ckks && key.includes('BATCH'))
                    }
                  >
                    {value}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <Grid item>
              <Button
                id={'BUTTON-execute-all'}
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.onExecAll}
                disabled={FctnComponents.length === 0}
              >
                <Typography id={'BUTTON-execute-all-text'} variant="button" display="block">
                  {intl.formatMessage({ id: 'execute_all' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <CodeContainer code={code} open={codeOpen} onClose={this.onClose} />
      </div>
    )
  }
}

export default compose(withStyles(styles), withConstants, injectIntl)(FunctionsContainer)

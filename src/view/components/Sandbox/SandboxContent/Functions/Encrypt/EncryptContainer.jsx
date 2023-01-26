import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class EncryptContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      plainTextId: 'select',
      cipherTextId: 'select'
    }
  }

  onPlainTextChange = event => {
    const { value } = event.target
    this.setState({
      plainTextId: value
    })
  }

  onCipherTextChange = event => {
    const { value } = event.target
    this.setState({
      cipherTextId: value
    })
  }

  _constructAction = () => {
    const { morfixEncryptRequest } = this.props

    const { plainTextId, cipherTextId } = this.state

    return {
      action: morfixEncryptRequest,
      payload: {
        plainTextId,
        cipherTextId
      }
    }
  }

  componentDidMount() {
    const { onUpdateAction, payload } = this.props
    this.setState(
      {
        ...(payload.plainTextId && { plainTextId: payload.plainTextId }),
        ...(payload.cipherTextId && { cipherTextId: payload.cipherTextId })
      },
      () => {
        const action = this._constructAction()
        onUpdateAction(action)
      }
    )
  }

  componentDidUpdate(prevProps, prevState, _snapshot) {
    const { onUpdateAction, payload } = this.props

    // If the state has changed, update the action
    if (prevState !== this.state) {
      const action = this._constructAction()
      onUpdateAction(action)
    }

    // If the payload contents changed, set the new state.
    if (
      prevProps.payload.plainTextId !== payload.plainTextId ||
      prevProps.payload.cipherTextId !== payload.cipherTextId
    ) {
      this.setState({
        ...this.state,
        ...(payload.plainTextId && { plainTextId: payload.plainTextId }),
        ...(payload.cipherTextId && { cipherTextId: payload.cipherTextId })
      })
    }
  }

  onExec = event => {
    event.preventDefault()
    const { onExec } = this.props
    onExec()
  }

  render() {
    const { classes, intl, plainTexts, cipherTexts, isEncryptorReady } = this.props

    const { plainTextId, cipherTextId } = this.state

    return (
      <Paper component="form" className={classes.root}>
        <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Grid
            item
            xs={12}
            sm={8}
            container
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <TextField
                select
                disabled={!isEncryptorReady}
                label={intl.formatMessage({ id: 'plaintext' })}
                helperText={intl.formatMessage({ id: 'plaintext_description_for_encryption' })}
                className={classes.textField}
                value={plainTexts[plainTextId] ? plainTextId : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onPlainTextChange}
              >
                <MenuItem value={'select'} disabled>
                  {intl.formatMessage({ id: 'select_a_plaintext' })}
                </MenuItem>

                {Object.entries(plainTexts).map(([key, value], index) => (
                  <MenuItem key={index} value={key}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                select
                disabled={!isEncryptorReady}
                label={intl.formatMessage({ id: 'ciphertext' })}
                helperText={intl.formatMessage({ id: 'ciphertext_description_for_encryption' })}
                className={classes.textField}
                value={cipherTexts[cipherTextId] ? cipherTextId : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onCipherTextChange}
              >
                <MenuItem value={'select'} disabled>
                  {intl.formatMessage({ id: 'select_a_ciphertext' })}
                </MenuItem>
                {Object.entries(cipherTexts).map(([key, value], index) => (
                  <MenuItem key={index} value={key}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                onClick={this.onExec}
                disabled={
                  !plainTexts[plainTextId] ||
                  cipherTextId === 'select' ||
                  !cipherTexts[cipherTextId] ||
                  plainTextId === 'select' ||
                  !isEncryptorReady
                }
              >
                <Typography variant="button" display="block">
                  {intl.formatMessage({ id: 'encrypt' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

EncryptContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(EncryptContainer)

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

class SubPlainFromCipherContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cipherTextIdA: 'select',
      plainTextIdB: 'select',
      cipherTextIdDestination: 'select'
    }
  }

  onCipherTextChangeA = event => {
    const { value } = event.target
    this.setState({
      cipherTextIdA: value
    })
  }

  onPlainTextChangeB = event => {
    const { value } = event.target
    this.setState({
      plainTextIdB: value
    })
  }

  onCipherTextChangeDestination = event => {
    const { value } = event.target
    this.setState({
      cipherTextIdDestination: value
    })
  }

  _constructAction = () => {
    const { morfixEvaluateSubPlainFromCipherRequest } = this.props

    const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = this.state

    return {
      action: morfixEvaluateSubPlainFromCipherRequest,
      payload: {
        cipherTextIdA,
        plainTextIdB,
        cipherTextIdDestination
      }
    }
  }

  componentDidMount() {
    const { onUpdateAction, payload } = this.props
    this.setState(
      {
        ...(payload.cipherTextIdA && { cipherTextIdA: payload.cipherTextIdA }),
        ...(payload.plainTextIdB && { plainTextIdB: payload.plainTextIdB }),
        ...(payload.cipherTextIdDestination && { cipherTextIdDestination: payload.cipherTextIdDestination })
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
      prevProps.payload.cipherTextIdA !== payload.cipherTextIdA ||
      prevProps.payload.plainTextIdB !== payload.plainTextIdB ||
      prevProps.payload.cipherTextIdDestination !== payload.cipherTextIdDestination
    ) {
      this.setState({
        ...this.state,
        ...(payload.cipherTextIdA && { cipherTextIdA: payload.cipherTextIdA }),
        ...(payload.plainTextIdB && { plainTextIdB: payload.plainTextIdB }),
        ...(payload.cipherTextIdDestination && { cipherTextIdDestination: payload.cipherTextIdDestination })
      })
    }
  }

  onExec = event => {
    event.preventDefault()
    const { onExec } = this.props
    onExec()
  }

  render() {
    const { classes, intl, plainTexts, cipherTexts, isEvaluatorReady } = this.props

    const { cipherTextIdA, plainTextIdB, cipherTextIdDestination } = this.state

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
                disabled={!isEvaluatorReady}
                label={intl.formatMessage({ id: 'ciphertext_a' })}
                helperText={intl.formatMessage({ id: 'ciphertext_a_description' })}
                className={classes.textField}
                value={cipherTexts[cipherTextIdA] ? cipherTextIdA : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onCipherTextChangeA}
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

            <Grid item>
              <TextField
                select
                disabled={!isEvaluatorReady}
                label={intl.formatMessage({ id: 'plaintext_b' })}
                helperText={intl.formatMessage({ id: 'plaintext_b_description' })}
                className={classes.textField}
                value={plainTexts[plainTextIdB] ? plainTextIdB : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onPlainTextChangeB}
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
                disabled={!isEvaluatorReady}
                label={intl.formatMessage({ id: 'ciphertext_destination' })}
                helperText={intl.formatMessage({ id: 'ciphertext_destination_description_sub' })}
                className={classes.textField}
                value={cipherTexts[cipherTextIdDestination] ? cipherTextIdDestination : 'select'}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                onChange={this.onCipherTextChangeDestination}
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
                  !cipherTexts[cipherTextIdA] ||
                  cipherTextIdA === 'select' ||
                  !plainTexts[plainTextIdB] ||
                  plainTextIdB === 'select' ||
                  !cipherTexts[cipherTextIdDestination] ||
                  cipherTextIdDestination === 'select' ||
                  !isEvaluatorReady
                }
              >
                <Typography variant="button" display="block">
                  {intl.formatMessage({ id: 'sub_plain_from_cipher' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

SubPlainFromCipherContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(SubPlainFromCipherContainer)

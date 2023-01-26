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

class RotateRowsContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cipherTextIdA: 'select',
      cipherTextIdDestination: 'select',
      steps: 1
    }
  }

  onCipherTextChangeA = event => {
    const { value } = event.target
    this.setState({
      cipherTextIdA: value
    })
  }

  onStepsChange = event => {
    const { value } = event.target

    if (!/^[\d-]*$/.test(value)) {
      return
    }

    const steps = parseInt(value, 10) || 0

    this.setState({
      steps: steps
    })
  }

  onCipherTextChangeDestination = event => {
    const { value } = event.target
    this.setState({
      cipherTextIdDestination: value
    })
  }

  _constructAction = () => {
    const { morfixEvaluateRotateRowsRequest } = this.props

    const { cipherTextIdA, steps, cipherTextIdDestination } = this.state

    return {
      action: morfixEvaluateRotateRowsRequest,
      payload: {
        cipherTextIdA,
        steps,
        cipherTextIdDestination
      }
    }
  }

  componentDidMount() {
    const { onUpdateAction, payload } = this.props
    this.setState(
      {
        ...(payload.cipherTextIdA && { cipherTextIdA: payload.cipherTextIdA }),
        ...(payload.steps && { steps: payload.steps }),
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
      prevProps.payload.steps !== payload.steps ||
      prevProps.payload.cipherTextIdDestination !== payload.cipherTextIdDestination
    ) {
      this.setState({
        ...this.state,
        ...(payload.cipherTextIdA && { cipherTextIdA: payload.cipherTextIdA }),
        ...(payload.steps && { steps: payload.steps }),
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
    const { classes, intl, cipherTexts, isEvaluatorReady } = this.props

    const { cipherTextIdA, cipherTextIdDestination, steps } = this.state

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
                label={intl.formatMessage({ id: 'ciphertext_destination' })}
                helperText={intl.formatMessage({ id: 'ciphertext_destination_description_rotate_rows' })}
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
            <Grid item>
              <TextField
                label={intl.formatMessage({ id: 'steps' })}
                helperText={intl.formatMessage({ id: 'steps_description' })}
                className={classes.textField}
                type="number"
                value={steps}
                onChange={this.onStepsChange}
              />
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
                  !cipherTexts[cipherTextIdDestination] ||
                  cipherTextIdDestination === 'select' ||
                  steps === '' ||
                  !isEvaluatorReady
                }
              >
                <Typography variant="button" display="block">
                  {intl.formatMessage({ id: 'rotate_rows' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

RotateRowsContainer.propTypes = {}

export default compose(withStyles(styles), withConstants, injectIntl)(RotateRowsContainer)

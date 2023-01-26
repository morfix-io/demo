import React, { PureComponent } from 'react'
import withConstants from 'view/hocs/withConstants'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import styles from './styles'
import { injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import shortid from 'shortid'

class EncParmsContainer extends PureComponent {
  onEncParmsCreate = () => {
    const { morfixCreateEncParmsRequest, encParm } = this.props
    morfixCreateEncParmsRequest({
      ...encParm,
      id: shortid()
    })
  }

  render() {
    const {
      classes,
      intl,
      encParm,
      onSchemeTypeChange,
      onSecurityLevelChange,
      onPolymodulusDegreeChange,
      onBitSizeChange,
      onBitSizesBlur,
      onBitSizesChange,
      onExpandModChainChange,
      constants: { SCHEME_TYPES, SECURITY_LEVELS, POLYMODULUS_DEGREES }
    } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {intl.formatMessage({ id: 'encryption_parameters' })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'encryption_parameters_description' })}
        </Typography>
        <Grid
          className={classes.gridRoot}
          direction="row"
          spacing={3}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id={'SELECT-scheme-type'}
              select
              label={intl.formatMessage({ id: 'scheme_type' })}
              helperText={intl.formatMessage({ id: 'select_a_scheme_type' })}
              className={classes.textField}
              value={encParm.schemeType}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              onChange={onSchemeTypeChange}
            >
              <MenuItem value={'select'} disabled>
                {intl.formatMessage({ id: 'scheme_type' })}
              </MenuItem>
              {Object.entries(SCHEME_TYPES).map(([_, value], index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id={'SELECT-security-level'}
              select
              label={intl.formatMessage({ id: 'security_level' })}
              helperText={intl.formatMessage({ id: 'security_level_description' })}
              className={classes.textField}
              value={encParm.securityLevel}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              onChange={onSecurityLevelChange}
            >
              <MenuItem value={'select'} disabled>
                {intl.formatMessage({ id: 'security_level' })}
              </MenuItem>
              {Object.entries(SECURITY_LEVELS).map(([_, value], index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id={'SELECT-polymodulus-degree'}
              select
              label={intl.formatMessage({ id: 'polymodulus_degree' })}
              helperText={intl.formatMessage({ id: 'polymodulus_degree_description' })}
              className={classes.textField}
              value={encParm.polyModulusDegree}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              onChange={onPolymodulusDegreeChange}
            >
              <MenuItem value={'select'} disabled>
                {intl.formatMessage({ id: 'polymodulus_degree' })}
              </MenuItem>
              {Object.entries(POLYMODULUS_DEGREES).map(([_, value], index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              id={'INPUT-coefficient-modulus'}
              fullWidth
              label={intl.formatMessage({ id: 'bit_sizes' })}
              helperText={intl.formatMessage({ id: 'coefficient_moduli_bit_sizes' })}
              className={classes.textField}
              type="text"
              name="bitSizes"
              value={encParm.bitSizes}
              onBlur={onBitSizesBlur}
              onChange={onBitSizesChange}
            />
          </Grid>
          {(encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) && (
            <Grid item>
              <TextField
                id={'INPUT-plain-modulus'}
                fullWidth
                label={intl.formatMessage({ id: 'bit_size' })}
                helperText={intl.formatMessage({ id: 'size_of_the_plain_modulus_in_bits' })}
                className={classes.textField}
                type="text"
                name="bitSize"
                value={encParm.bitSize}
                onChange={onBitSizeChange}
              />
            </Grid>
          )}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  id={'CHECKBOX-expand-modulus-chain'}
                  checked={encParm.expandModChain}
                  onChange={onExpandModChainChange}
                  value={!encParm.expandModChain}
                  color="primary"
                />
              }
              label={intl.formatMessage({ id: 'expand_modulus_chain' })}
              labelPlacement="end"
            />
            <FormHelperText>{intl.formatMessage({ id: 'expand_modulus_chain_description' })}</FormHelperText>
          </Grid>
          <Grid item direction="row" spacing={3} container justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Button
                id={'BUTTON-create-encryption-parameters'}
                variant="contained"
                color="primary"
                disabled={
                  !encParm.bitSizes ||
                  ((encParm.schemeType === SCHEME_TYPES.bfv || encParm.schemeType === SCHEME_TYPES.bgv) &&
                    !encParm.bitSize)
                }
                onClick={this.onEncParmsCreate}
              >
                <Typography id={'BUTTON-create-encryption-parameters'} variant="button" display="block">
                  {intl.formatMessage({ id: 'create_enc_parms' })}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.dividerMiddle} />
      </div>
    )
  }
}

EncParmsContainer.propTypes = {
  encParm: PropTypes.shape({
    schemeType: PropTypes.string.isRequired,
    securityLevel: PropTypes.string.isRequired,
    polyModulusDegree: PropTypes.string.isRequired,
    bitSize: PropTypes.number.isRequired,
    bitSizes: PropTypes.string.isRequired,
    expandModChain: PropTypes.bool.isRequired
  }),
  onSchemeTypeChange: PropTypes.func.isRequired,
  onSecurityLevelChange: PropTypes.func.isRequired,
  onExpandModChainChange: PropTypes.func.isRequired,
  onPolymodulusDegreeChange: PropTypes.func.isRequired,
  onBitSizeChange: PropTypes.func.isRequired,
  onBitSizesChange: PropTypes.func.isRequired
}

export default compose(withStyles(styles), withConstants, injectIntl)(EncParmsContainer)

import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SharedDialog from 'view/common/SharedDialog'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import MenuItem from '@material-ui/core/MenuItem'

class OrganizationContainer extends PureComponent {
  state = {
    organizationUuid: 'unselected'
  }

  componentDidMount() {
    // const { getUserOrganizationsRequest } = this.props
    // getUserOrganizationsRequest()
  }

  onSelectedOrganizationChange = event => {
    const { value } = event.target

    this.setState({
      organizationUuid: value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { setActiveOrganizationRequest } = this.props
    const { organizationUuid } = this.state
    setActiveOrganizationRequest({
      organization: {
        uuid: organizationUuid
      }
    })
  }

  render() {
    const { classes, currentOrganization, organizations, intl } = this.props
    const { organizationUuid } = this.state

    return (
      <Fragment>
        <SharedDialog
          open={!currentOrganization}
          title={intl.formatMessage({ id: 'active_organization' })}
          content={
            <Fragment>
              <DialogContentText>{intl.formatMessage({ id: 'please_select_an_organization' })}</DialogContentText>
              <TextField
                required
                select
                label={intl.formatMessage({ id: 'organization' })}
                className={classes.textField}
                value={organizationUuid}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
                onChange={this.onSelectedOrganizationChange}
                disabled={organizations.length === 0}
              >
                <MenuItem value="unselected" disabled>
                  {intl.formatMessage({ id: 'select_an_organization' })}
                </MenuItem>
                {organizations.allIds
                  .map(x => organizations.byId[x])
                  .map((org, index) => (
                    <MenuItem key={index} value={org.uuid}>
                      {org.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Fragment>
          }
          actions={
            <Button onClick={this.onSubmit} color="primary" disabled={organizationUuid === 'unselected'}>
              {intl.formatMessage({ id: 'submit' })}
            </Button>
          }
        />
      </Fragment>
    )
  }
}

OrganizationContainer.propTypes = {
  getUserOrganizationsRequest: PropTypes.func.isRequired
}

export default compose(withStyles(styles), injectIntl)(OrganizationContainer)

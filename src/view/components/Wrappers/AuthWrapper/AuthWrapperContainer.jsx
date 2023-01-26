import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import MainLoader from 'view/common/MainLoader'
import RefreshWrapperConnected from './RefreshWrapper'
import OrganizationConnected from './Organization'

const AuthWrapper = props => {
  const {
    user,
    getUserDataRequest,
    getUserOrganizationsRequest,
    children,
    isLoggedIn,
    currentOrganization,
    organizations,
    setActiveOrganizationRequest
  } = props

  const organization = organizations.byId[currentOrganization]

  useEffect(() => {
    if (!user.name) {
      getUserDataRequest()
      getUserOrganizationsRequest()
    }
  }, [user.name, getUserDataRequest, getUserOrganizationsRequest])

  useEffect(() => {
    if (!organization && organizations.allIds.length === 1) {
      setActiveOrganizationRequest({
        organization: organizations.byId[organizations.allIds[0]]
      })
    }
  }, [organization, organizations.allIds, organizations.byId, setActiveOrganizationRequest])

  return (
    <RefreshWrapperConnected>
      {(!isLoggedIn || !organization) && <MainLoader />}
      {isLoggedIn && !organization && organizations.allIds.length > 1 && <OrganizationConnected />}
      {isLoggedIn && organization && <Fragment>{children}</Fragment>}
    </RefreshWrapperConnected>
  )
}

AuthWrapper.propTypes = {
  getUserDataRequest: PropTypes.func.isRequired,
  getUserOrganizationsRequest: PropTypes.func.isRequired,
  setActiveOrganizationRequest: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.any,
  organizations: PropTypes.any,
  user: PropTypes.any,
  currentOrganization: PropTypes.any
}

export default AuthWrapper

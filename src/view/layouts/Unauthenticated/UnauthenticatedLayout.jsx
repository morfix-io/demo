import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TopBar from 'view/common/TopBar'

const UnauthenticatedLayout = ({ children }) => {
  return (
    <Fragment>
      <TopBar />
      {children}
    </Fragment>
  )
}

UnauthenticatedLayout.propTypes = {
  children: PropTypes.any
}

export default UnauthenticatedLayout

import React, { Fragment } from 'react'
import UnauthenticatedLayout from 'view/layouts/Unauthenticated'
import { Helmet } from 'react-helmet-async'
import Page404Connected from 'view/components/Auth/Page404'

const Page404 = () => {
  return (
    <UnauthenticatedLayout>
      <Fragment>
        <Helmet>
          <title>404</title>
          <meta name="description" content="404 - Page Not Found" />
        </Helmet>
        <Page404Connected />
      </Fragment>
    </UnauthenticatedLayout>
  )
}

export default Page404

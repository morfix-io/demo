import React, { Fragment } from 'react'
import UnauthenticatedLayout from 'view/layouts/Unauthenticated'
import Sandbox from 'view/components/Sandbox'
import { Helmet } from 'react-helmet-async'

const SandboxPage = () => {
  return (
    <UnauthenticatedLayout>
      <Fragment>
        <Helmet>
          <title>Sandbox</title>
          <meta
            name="description"
            content="Morfix.io is the best way to build privacy-preserving applications using homomorphic encryption powered by Microsoft SEAL"
          />
        </Helmet>
        <Sandbox />
      </Fragment>
    </UnauthenticatedLayout>
  )
}

export default SandboxPage

import React, { Fragment, PureComponent } from 'react'
import { Helmet } from 'react-helmet-async'
import Card404 from './Card404'

class Page404Container extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>404</title>
          <meta name="description" content="404 - Page Not Found" />
        </Helmet>
        <Card404 />
      </Fragment>
    )
  }
}

export default Page404Container

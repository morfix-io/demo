import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider } from 'react-intl'

import en from 'locales/english'

const locales = {
  english: {
    name: 'en',
    messages: en
  }
}

const Localization = props => {
  const { children, language } = props
  const locale = locales[language] || locales.english
  return (
    <IntlProvider locale={locale.name} messages={locale.messages}>
      {children}
    </IntlProvider>
  )
}

Localization.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default Localization

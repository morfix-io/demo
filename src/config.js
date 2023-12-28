const { NODE_ENV, REACT_APP_MORFIX_FRONTEND_HOST, REACT_APP_SENTRY_DSN, REACT_APP_GTM_ID } = process.env
const config = {
  NODE_ENV,
  FRONTEND_HOST: REACT_APP_MORFIX_FRONTEND_HOST || 'https://s0l0ist.github.io/seal-sandbox',
  ROUTES: {
    HOME: ''
  },
  SENTRY_DSN: REACT_APP_SENTRY_DSN || 'https://3a6178c24e7847bebb8a02e341cce224@o281265.ingest.sentry.io/1506382',
  GTM_ID: REACT_APP_GTM_ID || 'GTM-5DXRW5L',
  REQUEST_TIMEOUT_MS: 60000
}
export default config

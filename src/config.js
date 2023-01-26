const {
  NODE_ENV,
  REACT_APP_MORFIX_IAM_HOST,
  REACT_APP_MORFIX_BACKEND_HOST,
  REACT_APP_MORFIX_ENGINE_HOST,
  REACT_APP_MORFIX_FRONTEND_HOST,
  REACT_APP_SENTRY_DSN,
  REACT_APP_GTM_ID
} = process.env

const config = {
  NODE_ENV,

  IAM_HOST: REACT_APP_MORFIX_IAM_HOST || 'https://iam.morfix.io',
  BACKEND_HOST: REACT_APP_MORFIX_BACKEND_HOST || 'https://logic.morfix.io',
  ENGINE_HOST: REACT_APP_MORFIX_ENGINE_HOST || 'https://engine.morfix.io',
  FRONTEND_HOST: REACT_APP_MORFIX_FRONTEND_HOST || 'https://morfix.io',

  ROUTES: {
    BASE: '', // Must be empty or leading with a '/'
    AUTH: 'auth',
    PAGE404: '404',
    PAGE500: '500',
    REGISTER: 'register',
    VERIFY: {
      EMAIL: 'verify/email',
      RESET: 'verify/reset',
      DEVICE: 'verify/device',
      INVITATION: 'verify/invitation'
    },
    FORGOT: 'forgot',
    LOGIN: 'login',
    LOGOUT: 'logout',
    PROJECTS: 'projects',
    NEW: 'new',
    EDIT: 'edit',
    APIS: 'apis',
    KEYS: 'keys',
    TEAMS: 'teams',
    SETTINGS: 'settings',
    DASH: 'dashboard',
    SANDBOX: 'sandbox',
    DOCS: 'docs',
    PRICING: 'pricing',
    PRODUCT: 'product',
    PRIVACY: 'privacy',
    TERMS: 'terms'
  },

  SENTRY_DSN: REACT_APP_SENTRY_DSN || 'https://3a6178c24e7847bebb8a02e341cce224@o281265.ingest.sentry.io/1506382',

  GTM_ID: REACT_APP_GTM_ID || 'GTM-5DXRW5L',

  REQUEST_TIMEOUT_MS: 60000
}

export default config

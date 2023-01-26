const logProvider = {}

logProvider.init = () => {}

logProvider.sendError = error => {
  // eslint-disable-next-line no-console
  console.error(
    'LOCAL LOG REPORTER ERROR:',
    JSON.stringify(error, (_k, v) => (v === undefined ? 'undefined' : v), 2)
  )
  // eslint-disable-next-line no-console
  console.error(error)
}

logProvider.addBreadcrumb = () => {}

export default logProvider

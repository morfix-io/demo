export default theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  fab: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.info.main
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  grid: {
    width: '100%'
  },
  iconSuccess: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.light
  },
  iconFailure: {
    marginRight: theme.spacing(2),
    color: theme.palette.error.light
  },
  iconUnknown: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.light
  },
  iconButton: {
    padding: 10,
    color: theme.palette.error.light
  },
  beta: {
    color: theme.palette.getContrastText(theme.palette.beta.main),
    backgroundColor: theme.palette.beta.main
  }
})

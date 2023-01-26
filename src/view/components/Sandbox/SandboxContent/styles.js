export default theme => ({
  root: {
    flexGrow: 1
  },
  gridRoot: {
    flexGrow: 1
  },
  gridItem: {
    height: '100%'
  },
  dividerMiddle: {
    marginTop: 15,
    marginBottom: 15
  },
  beta: {
    marginRight: 15,
    color: theme.palette.getContrastText(theme.palette.beta.main),
    backgroundColor: theme.palette.beta.main
  },
  getStarted: {
    marginRight: 15,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.primary.light),
      backgroundColor: theme.palette.primary.light
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
})

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import config from 'config'
import { Button, AppBar, Toolbar, Typography, Grid, Hidden, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as IconWhite } from 'branding/IconWhite.svg'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  home: {
    padding: 0,
    borderRadius: 50,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main
  },
  link: {
    borderRadius: 50,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main
    }
  },
  linkText: {
    padding: '0px 10px'
  },
  menu: {
    height: 40,
    borderRadius: 50,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderColor: theme.palette.info.main
  },
  menuIcon: {
    marginRight: -10
  },
  fullList: {
    width: 'auto'
  },
  iconButton: {
    padding: 0
  },
  icon: {
    padding: '5px 5px 5px 5px',
    width: 58,
    height: 58
  }
}))

const TopBar = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between" direction="row" alignItems="center" spacing={0}>
            <Grid container item justifyContent="flex-start" direction="row" alignItems="center" xs={2}>
              <Hidden only={['sm']}>
                <Grid item>
                  <Button
                    id={'LINK-home'}
                    className={classes.home}
                    disableFocusRipple={true}
                    disableRipple={true}
                    component={Link}
                    to={`${config.ROUTES.BASE}/${config.ROUTES.SANDBOX}`}
                  >
                    <Typography id={'LINK-home-text'} variant="h4" component="h1" display="block">
                      MORFIX
                    </Typography>
                  </Button>
                </Grid>
              </Hidden>
              <Hidden only={['xs', 'md', 'lg', 'xl']}>
                <Grid item>
                  <IconButton
                    aria-label="Morfix-icon"
                    className={classes.iconButton}
                    component={Link}
                    to={`${config.ROUTES.BASE}/${config.ROUTES.SANDBOX}`}
                  >
                    <IconWhite className={classes.icon} />
                  </IconButton>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </Fragment>
  )
}

export default TopBar

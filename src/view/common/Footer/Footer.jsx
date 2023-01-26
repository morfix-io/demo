import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import config from 'config'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}))

const footers = [
  {
    title: 'Company',
    description: [
      { name: 'Product', to: `${config.ROUTES.BASE}/${config.ROUTES.PRODUCT}` },
      { name: 'Pricing', to: `${config.ROUTES.BASE}/${config.ROUTES.PRICING}` },
      { name: 'Sandbox', to: `${config.ROUTES.BASE}/${config.ROUTES.SANDBOX}` }
      // { name: 'Docs', to: `${config.ROUTES.BASE}/${config.ROUTES.DOCS}` }
    ]
  }
  // {
  //   title: 'Legal',
  //   description: [
  //     { name: 'Privacy policy', to: `${config.ROUTES.BASE}/${config.ROUTES.PRIVACY}` },
  //     { name: 'Terms of use', to: `${config.ROUTES.BASE}/${config.ROUTES.TERMS}` }
  //   ]
  // }
]

const Footer = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map(footer => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map(item => (
                <li key={item.name}>
                  <Link className={classes.link} to={item.to}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Footer

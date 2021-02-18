import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  welcome: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 'bold',
    color: theme.palette.green['500'],
    margin: theme.spacing(6, 0, 4, 0),
  },
  companyName: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.palette.green['500'],
  },
}));

function TopLogoBox() {
  const classes = useStyles();

  return (
    <Typography className={classes.welcome} align="center">
      <Link className={classes.companyName} href="/">
        budge.
      </Link>
    </Typography>
  );
}

export default TopLogoBox;

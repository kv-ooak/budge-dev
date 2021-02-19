/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    width: '85%',
  },
  form: {
    position: 'relative',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    alignItems: 'center',
  },
  inputWrap: {
    position: 'relative',
    width: '100%',
    height: theme.spacing(10),
    marginBottom: theme.spacing(22),
  },
  revealPassword: {
    zIndex: 1000,
    position: 'absolute',
    right: theme.spacing(2.4),
    top: theme.spacing(4.6),
    cursor: 'pointer',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  information: {
    fontWeight: '400',
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[600],
    margin: theme.spacing(2, 0),
    paddingBottom: theme.spacing(8),
  },
  fieldTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[600],
  },
  backButton: {
    position: 'fixed',
    left: theme.spacing(3),
    top: theme.spacing(1),
  },
  backButtonIcon: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: theme.palette.green[500],
  },
  loading: {
    justifyContent: 'center',
    margin: theme.spacing(3, 0, 3),
    color: theme.palette.green[500],
  },
  loaded: {
    justifyContent: 'center',
    margin: theme.spacing(3, 0, 3),
    color: theme.palette.green[500],
  },
  pad0: { paddingLeft: 0, },
  pageTitle:{color: theme.palette.green[500], fontSize:18, fontWeight:600,letterSpacing:1,
    width: '100%', textAlign:'center', borderBottom: '0.2px solid #96A2AC', paddingBottom:20, marginBottom: 20,
  },
  listBoxCont:{width:'100%'},
  titleTxt:{fontSize:18, color:'#000', padding:0},
  listBox:{background: '#FFFFFF', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    borderRadius: 4, marginBottom:15,},
  listBoxTxt:{'& span':{color: theme.palette.green[500], fontSize:16, fontWeight:600,letterSpacing:1,}}
  
}));

function ProfileQuellen() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton className={classes.backButton} aria-label="back" onClick={() => history.push('./')}>
          <ArrowBackOutlinedIcon className={classes.backButtonIcon} />
        </IconButton>
        <Typography component='h2' className={classes.pageTitle}>Unsere Quellen & Partner</Typography>
        <Grid container className={classes.container} spacing={2} direction="column" alignContent="center">
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" className={classes.titleTxt}>Impact</ListSubheader>
              }
              className={classes.listBoxCont}
            >
              <ListItem button className={classes.listBox}>
                <ListItemText className={classes.listBoxTxt} primary="Berechnungen Wasser" />
              </ListItem>
              <ListItem button className={classes.listBox}>
                <ListItemText className={classes.listBoxTxt} primary="Berechnungen CO2" />
              </ListItem>
              <ListItem button className={classes.listBox}>
                <ListItemText className={classes.listBoxTxt} primary="Berechnungen Bäume" />
              </ListItem>
              <ListItem button className={classes.listBox}>
                <ListItemText className={classes.listBoxTxt} primary="Berechnungen Ersparnisse" />
              </ListItem>
            </List>
        </Grid>
      </Container>
    </>
  );
}

export default ProfileQuellen;

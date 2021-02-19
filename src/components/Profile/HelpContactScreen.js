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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


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
    width: '100%',
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
  pageTitle:{color: theme.palette.green[500], fontSize:18, fontWeight:600, letterSpacing:1,
    width: '100%', textAlign:'center', borderBottom: '0.2px solid #96A2AC', paddingBottom:20, marginBottom: 20,
  },
  listBoxCont:{width:'100%'},
  titleTxt:{fontSize:18, color:'#000', padding:0},
  listBox:{backgroundColor:'#fff', paddingTop:20,paddingBottom:20, borderBottom: '0.5px solid #D2DBCE'},
  listBoxTxt:{'& span':{color:'#000', fontSize:17, fontWeight:600, letterSpacing:1,}}
  
}));

function HelpContactScreen() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton className={classes.backButton} aria-label="back" onClick={() => history.push('./')}>
          <ArrowBackOutlinedIcon className={classes.backButtonIcon} />
        </IconButton>
        <Typography component='h2' className={classes.pageTitle}>Hilfe & Kontakt</Typography>
        <Grid container className={classes.container} spacing={2} direction="column" alignContent="center">
            <List
              component="nav"
              className={classes.listBoxCont}
            >
              <ListItem button className={classes.listBox} onClick={() => history.push('/faq')}>
                <ListItemText className={classes.listBoxTxt} primary="FAQ" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <ArrowForwardIosIcon />   
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button className={classes.listBox} onClick={() => history.push('/contact')}>
                <ListItemText className={classes.listBoxTxt} primary="Kontakt" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
        </Grid>
      </Container>
    </>
  );
}

export default HelpContactScreen;

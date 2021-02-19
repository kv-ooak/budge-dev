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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

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
    width: '100%', textAlign:'center', borderBottom:'0.5px solid #D2DBCE', paddingBottom:20, marginBottom: 20,
  },
  listBoxCont:{width:'100%'},
  titleTxt:{fontSize:18, color:'#000',},
  listBox:{backgroundColor:'#fff', paddingTop:10,paddingBottom:10, borderBottom: '0.5px solid #D2DBCE'},
  listBoxTxt:{'& span':{color:'#000', fontSize:15, fontWeight:400, letterSpacing:1,}},
  nested:{borderBottom: '0.5px solid #D2DBCE'}
}));

function FaqScreen() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton className={classes.backButton} aria-label="back" onClick={() => history.push('helpandcontact')}>
          <ArrowBackOutlinedIcon className={classes.backButtonIcon} />
        </IconButton>
        <Typography component='h2' className={classes.pageTitle}>FAQ</Typography>
        <Grid container className={classes.container} spacing={2} direction="column" alignContent="center">
            <List
              component="nav"
              className={classes.listBoxCont}
              subheader={
                <ListSubheader component="div" className={classes.titleTxt}>FAQ</ListSubheader>
              }
            >
              <ListItem button className={classes.listBox} onClick={handleClick}>
                <ListItemText className={classes.listBoxTxt} primary="Wie werden die Green Points berechnet? " />
              </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText className={classes.listBoxTxt} primary="content will be here" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem button className={classes.listBox} onClick={handleClick}>
                <ListItemText className={classes.listBoxTxt} primary="Wie wird mein Klima-Impact (z.B. CO2) bestimmt?" />
              </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText className={classes.listBoxTxt} primary="content will be here" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem button className={classes.listBox} onClick={handleClick}>
                <ListItemText className={classes.listBoxTxt} primary="Wie werden die Green Points berechnet? " />
              </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText className={classes.listBoxTxt} primary="content will be here" />
                    </ListItem>
                  </List>
                </Collapse>
            </List>
        </Grid>
      </Container>
    </>
  );
}

export default FaqScreen;

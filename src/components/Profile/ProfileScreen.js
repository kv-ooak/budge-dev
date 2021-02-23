/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { updateActiveTab } from '../../redux/reducers/mainReducer';
import { getCurrentTeam } from '../../redux/actions/teamActions';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    marginTop: theme.spacing(6),
  },
  icon: {
    color: theme.palette.green[500],
  },
  itemName: {
    color: theme.palette.grey[600],
    fontWeight: '600',
  },
  userIcon: {
    backgroundColor: theme.palette.green[500],
    color: '#ffffff',
    border: '1px solid',
    fontFamily: '"Montserrat-ExtraBold", sans-serif',
    height: theme.spacing(18),
    width: theme.spacing(18),
    marginRight: theme.spacing(4),
  },
  username: {
    fontFamily: '"Montserrat-Bold", sans-serif',
    color: theme.palette.grey[700],
    fontSize: theme.typography.h6.fontSize,
  },
  teamName: {
    fontFamily: '"Montserrat-Bold", sans-serif',
    color: theme.palette.green[500],
    fontSize: theme.typography.h6.fontSize,
  },
}));

const listItemData = [
  {
    id: 'account',
    name: 'Account & Privatsphäre',
    headline: 'Benutzername & Passwort ändern',
  },
  {
    id: 'profilequellen',
    name: 'Unsere Quellen',
    headline: 'Durchstöbere unsere Datenquellen',
  },
  {
    id: 'account',
    name: 'Hilfe & Kontakt',
    headline: 'Fragen und Hilfe',
  },

  {
    id: 'signout',
    name: 'Signout',
    headline: '',
  },
];

export default function ProfileScreen() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [error, setError] = useState(null);

  const currentUser = useSelector((state) => state.userReducer.data);
  const { currentTeam } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(updateActiveTab('profile'));
    dispatch(getCurrentTeam());
  }, []);

  const handleClick = (id) => {
    setCurrentScreen(id);
  };

  // if (currentScreen === 'signout') {
  //   firebase.auth().signOut().then(() => {
  //     history.push('/signin');
  //   }, (e) => {
  //     setError(e.message);
  //     console.log(error);
  //   });
  // }

  if (currentScreen === 'account') {
    history.push('/profile/account');
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={currentUser.username}
            src="/static/images/avatar/default.png"
            className={classes.userIcon}
          />
        </ListItemAvatar>   
        <ListItemText
          primary={(
            <Typography className={classes.username}>
              {currentUser.username}
            </Typography>
          )}
          secondary={(
            <Typography className={classes.teamName}>
              Team:
              {' '}
              {currentTeam.name}
            </Typography>
          )}
        />
      </ListItem>
      <List component="nav" aria-label="main mailbox folders">
        {listItemData.map((item) => (
          <>
            <ListItem
              key={item.id}
              button
              onClick={() => handleClick(item.id)}
            >
              <ListItemIcon className={classes.icon}>
                {item.id === 'account' && <AccountCircleOutlinedIcon /> }
                {item.id === 'profilequellen' && <ExitToAppOutlinedIcon /> }
                {item.id === 'helpandcontact' && <ExitToAppOutlinedIcon /> }
                {item.id === 'signout' && <ExitToAppOutlinedIcon /> }
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.itemName}>{item.name}</Typography>}
                secondary={item.headline}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Container>
  );
}

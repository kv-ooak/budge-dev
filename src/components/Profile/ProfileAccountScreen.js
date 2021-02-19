/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import CustomButton from '../../_reusable/UI/CustomButton';
import CustomInputBoxWithHelper from '../../_reusable/UI/CustomInputBoxWithHelper';
import EditIcon from '@material-ui/icons/Edit';

import { updateUsername } from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    width: '85%',  marginTop: theme.spacing(8),
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
  backendError: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.body1,
    color: theme.palette.error.light,
  },

  userIcon: {
    backgroundColor: theme.palette.green[500],
    color: '#ffffff',
    border: '1px solid',
    fontFamily: '"Montserrat-ExtraBold", sans-serif',
    height: theme.spacing(18),
    width: theme.spacing(18),
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
  pad0: { paddingLeft: 0, },
  boxAvtar: {
    marginRight: theme.spacing(4),
    height: 72, width: 72, position: 'relative'
  },
  buttonEdit: {
    position: 'absolute',  bottom: 0, right: 0, border: 0, outline: 'none', cursor: 'pointer',
    '&>span':{ borderRadius: '60%', height: 30, width: 30, backgroundColor: '#DFDFDF !important',},
    '& svg': {
      width: '.8em', color: theme.palette.green[500],
    }
  },
  fileinput: { display: 'none' }
}));

function ProfileAccountScreen() {
  const classes = useStyles();
  const currentUser = useSelector((_state) => _state.userReducer.data);
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'USERNAME': return {
        ...state,
        username: {
          ...state.username,
          value: action.payload,
        },
      };

      case ('USERNAME_ERROR'): return {
        ...state,
        username: {
          ...state.username,
          error: action.payload,
        },
      };

      case ('PASSWORD'): return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
        },
      };

      case ('CURRENT_PASSWORD'): return {
        ...state,
        currentPassword: {
          ...state.currentPassword,
          value: action.payload,
        },
      };

      case ('CURRENT_PASSWORD_ERROR'): return {
        ...state,
        currentPassword: {
          ...state.currentPassword,
          error: action.payload,
        },
      };

      case ('PASSWORD_ERROR'): return {
        ...state,
        password: {
          ...state.password,
          error: action.payload,
        },
      };

      case ('RESET_ERRORS'): return {
        ...state,
        username: {
          ...state.username,
          error: null,
        },
        password: {
          ...state.password,
          error: null,
        },
      };

      default: return state;
    }
  }, {
    username: {
      value: currentUser.username,
      error: null,
    },
    currentPassword: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
  });

  const history = useHistory();
  const _dispatch = useDispatch();

  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusCurrentPassword, setFocusCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);


  const [imagePreviewUrl, setImgPreview] = useState();
  const [file, setFile] = useState(null);


  console.log(loading, error);

  const action = (type, payload) => ({
    type,
    payload,
  });

  async function handleFormSubmit() {
    setLoading(true);
    setError(null);
    dispatch(action('RESET_ERRORS'));
    setFocusUsername(false);
    setFocusPassword(false);
    setFocusCurrentPassword(false);
    const passwordRegex = /(?=.*[0-9a-zA-Z]).{6,}/;

    if (!state.username.value) {
      dispatch(action('USERNAME_ERROR', 'Der Benutzername ist erforderlich.'));
      return false;
    }

    if (state.username.value !== currentUser.username) {
      _dispatch(updateUsername({ username: state.username.value }));
      setSuccess(true);
    }

    if (state.password.value !== '') {
      if (state.currentPassword.value.length > 0 && state.currentPassword.value.length < 6) {
        dispatch(action('CURRENT_PASSWORD_ERROR', 'Ihr Passwort muss mindestens 6 Zeichen lang sein'));
        setLoading(false);
        return false;
      }

      if (
        state.currentPassword.value.length > 6 && !passwordRegex.test(state.currentPassword.value)
      ) {
        dispatch(action('CURRENT_PASSWORD_ERROR', 'Ihr Passwort hat nicht das richtige Muster.'));
        setLoading(false);
        return false;
      }

      if (state.password.value.length > 0 && state.password.value.length < 6) {
        dispatch(action('PASSWORD_ERROR', 'Ihr Passwort muss mindestens 6 Zeichen lang sein'));
        setLoading(false);
        return false;
      }

      if (state.password.value.length > 6 && !passwordRegex.test(state.password.value)) {
        dispatch(action('PASSWORD_ERROR', 'Ihr Passwort hat nicht das richtige Muster.'));
        setLoading(false);
        return false;
      }

      firebase.auth().signInWithEmailAndPassword(
        currentUser.email, state.currentPassword.value,
      )
        .then(() => {
          firebase.auth().currentUser.updatePassword(state.password.value).then(() => {
            setLoading(false);
            setError(false);
            setSuccess(true);
          })
            .catch((e) => {
              dispatch(action('CURRENT_PASSWORD_ERROR', e.message));
              return setLoading(false);
            });
        })
        .catch((e) => {
          dispatch(action('CURRENT_PASSWORD_ERROR', e.message));
          return setLoading(false);
        });
    }
    return setLoading(false);
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleFormSubmit();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [state.username, state.email, state.password]);


  const handleImageUPload = (e) => {
    let file = e.target.files[0];
    setImgPreview(URL.createObjectURL(file))
    setFile(file)
  }


  return (
    <>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <IconButton className={classes.backButton} aria-label="back" onClick={() => history.push('./')}>
          <ArrowBackOutlinedIcon className={classes.backButtonIcon} />
        </IconButton>
        <Grid container className={classes.container} spacing={2} direction="column" alignContent="center">

          <ListItem className={classes.pad0}>
            <ListItemAvatar>
              <Box className={classes.boxAvtar}>
                <Avatar
                  alt={currentUser.username}
                  src={imagePreviewUrl}
                  className={classes.userIcon}
                />
                <form encType="multipart/form-data">
                  <input accept="image/*" className={classes.fileinput} id="icon-button-file" type="file" onChange={handleImageUPload} />
                  <label htmlFor="icon-button-file" className={classes.buttonEdit}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <EditIcon />
                    </IconButton>
                  </label>
                </form>
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={(
                <Typography className={classes.username}>
                  Nik
                </Typography>
              )}
              secondary={(
                <Typography className={classes.teamName}>
                  Team:
                </Typography>
              )}
            />
          </ListItem>

          <FormGroup className={classes.form} noValidate>
            <Typography className={classes.information}>
              Andere Nutzer innerhalb Deines Teams können sehen,
              {' '}
              wie viele Green Points Du bisher gesammelt hast.
            </Typography>
            <Grid item xs={12} className={classes.inputWrap}>
              <Typography className={classes.fieldTitle}>
                Benutzername
              </Typography>
              <CustomInputBoxWithHelper
                size="small"
                fullWidth
                id="username"
                variant="outlined"
                placeholder="Benutzername"
                value={state.username.value}
                error={Boolean(state.username.error)}
                onFocus={() => setFocusUsername(true)}
                isfocus={focusUsername.toString()}
                helpertext={state.username.error || 'Benutzername wird anderen Nutzern angezeit.'}
                onBlur={() => setFocusUsername(false)}
                onChange={(e) => dispatch(action('USERNAME', e.target.value))}
              />
            </Grid>

            <Grid item xs={12} className={classes.inputWrap}>
              <Typography className={classes.fieldTitle}>
                Dein aktuelles Passwort
              </Typography>
              <CustomInputBoxWithHelper
                size="small"
                fullWidth
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                variant="outlined"
                placeholder="Passwort"
                endAdornment={(
                  <Tooltip title={showCurrentPassword ? 'Hide password' : 'Show password'}>
                    <InputAdornment className={classes.revealPassword} position="end">
                      <RemoveRedEye onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                    </InputAdornment>
                  </Tooltip>
                )}
                error={Boolean(state.currentPassword.error)}
                onFocus={() => setFocusCurrentPassword(true)}
                isfocus={focusCurrentPassword.toString()}
                helpertext={state.currentPassword.error || 'Ihr Passwort muss mindestens 6 Zeichen lang sein.'}
                onBlur={() => setFocusCurrentPassword(false)}
                onChange={(e) => dispatch({ type: 'CURRENT_PASSWORD', payload: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} className={classes.inputWrap}>
              <Typography className={classes.fieldTitle}>
                Neues passwort
              </Typography>
              <CustomInputBoxWithHelper
                size="small"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                id="password"
                variant="outlined"
                placeholder="Passwort"
                endAdornment={(
                  <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                    <InputAdornment className={classes.revealPassword} position="end">
                      <RemoveRedEye onClick={() => setShowPassword(!showPassword)} />
                    </InputAdornment>
                  </Tooltip>
                )}
                error={Boolean(state.password.error)}
                onFocus={() => setFocusPassword(true)}
                isfocus={focusPassword.toString()}
                helpertext={state.password.error || 'Ihr Passwort muss mindestens 6 Zeichen lang sein.'}
                onBlur={() => setFocusPassword(false)}
                onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} className={classes.backendError}>
              {error && error}
            </Grid>

            {(error === null && success === null && (loading === false || loading === null)) && (
              <CustomButton
                type="button"
                className={classes.submit}
                onClick={handleFormSubmit}
              >
                Speichern
              </CustomButton>
            )}

            {loading === true && (
              <Grid container className={classes.loading}>
                <CircularProgress size={24} />
              </Grid>
            )}

            {(success === true && loading === false) && (
              <Grid container className={classes.loaded}>
                <DoneOutlineIcon size={24} />
              </Grid>
            )}

          </FormGroup>
        </Grid>
      </Container>
    </>
  );
}

export default ProfileAccountScreen;

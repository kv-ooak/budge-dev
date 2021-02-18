import firebase from 'firebase';

import {
  API_URL,
  API_USER_SUFFIX,
  API_USERNAME_SUFFIX,
} from '../../constants/urls';

import {
  getUserBegin,
  getUserSuccess,
  getUserError,
  resetUserState,

  updateUsernameBegin,
  updateUsernameSuccess,
  updateUsernameError,
} from '../reducers/userReducer';

export const updateUsername = (data) => (dispatch) => {
  dispatch(updateUsernameBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_USER_SUFFIX}${API_USERNAME_SUFFIX}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify(data),
        });

        const updated = await response.json();
        if (updated.error) {
          throw (updated.error);
        }

        dispatch(updateUsernameSuccess(updated));
        return updated;
      } catch (e) {
        dispatch(updateUsernameError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(updateUsernameError(error.message));
      return error;
    }
    return user;
  });
};

const getCompleteUserProfile = () => (dispatch) => {
  dispatch(resetUserState());
  dispatch(getUserBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        console.log('FB Token', token);
        const response = await fetch(`${API_URL}${API_USER_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const profile = await response.json();
        if (profile.error) {
          throw (profile.error);
        }

        dispatch(getUserSuccess({
          data: profile,
          verified: currentUser.emailVerified,
          anonymous: false,
        }));
        return profile;
      } catch (e) {
        dispatch(getUserError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getUserError(error.message));
      return error;
    }
    return user;
  });
};

export default getCompleteUserProfile;

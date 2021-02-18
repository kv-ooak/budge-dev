import firebase from 'firebase';

import {
  API_URL,
  API_WEEK_SUFFIX,
} from '../../constants/urls';

import {
  getWeekBegin,
  getWeekSuccess,
  getWeekError,
} from '../reducers/weekReducer';

const getActiveWeek = () => async (dispatch) => {
  dispatch(getWeekBegin());

  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_WEEK_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const activeWeek = await response.json();

        if (activeWeek.error) {
          throw (activeWeek.error);
        }

        dispatch(getWeekSuccess({
          data: activeWeek,
        }));

        return activeWeek;
      } catch (e) {
        dispatch(getWeekError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getWeekError(error));
      return error;
    }
    return user;
  });
};

export default getActiveWeek;

import firebase from 'firebase';

import {
  API_URL,
  API_TEAM_SUFFIX,
  API_CURRENT_SUFFIX,
} from '../../constants/urls';

import {
  getCompanyBegin,
  getCompanySuccess,
  getCompanyError,
  resetCompanyState,

  getCurrentTeamBegin,
  getCurrentTeamSuccess,
  getCurrentTeamError,
  resetCurrentTeamState,
} from '../reducers/teamReducer';

export const getCurrentCompany = () => (dispatch) => {
  dispatch(resetCompanyState());
  dispatch(getCompanyBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_TEAM_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const teams = await response.json();
        if (teams.error) {
          throw (teams.error);
        }

        dispatch(getCompanySuccess(teams));
        return teams;
      } catch (e) {
        dispatch(getCompanyError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getCompanyError(error.message));
      return error;
    }
    return user;
  });
};

export const getCurrentTeam = () => (dispatch) => {
  dispatch(resetCurrentTeamState());
  dispatch(getCurrentTeamBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_TEAM_SUFFIX}${API_CURRENT_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const team = await response.json();
        if (team.error) {
          throw (team.error);
        }

        dispatch(getCurrentTeamSuccess(team));
        return team;
      } catch (e) {
        dispatch(getCurrentTeamError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getCurrentTeamError(error.message));
      return error;
    }
    return user;
  });
};

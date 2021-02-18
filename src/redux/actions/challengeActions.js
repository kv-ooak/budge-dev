import firebase from 'firebase';

import {
  API_URL,
  API_CHALLENGE_SUFFIX,
  API_CHALLENGE_ACCEPT_SUFFIX,
  API_CHALLENGE_STREAK_SUFFIX,
  API_CHALLENGE_STEPS_SUFFIX,
  API_CURRENT_SUFFIX,
} from '../../constants/urls';

import {
  updateChallengeProgressStepBegin,
  updateChallengeProgressStepSuccess,
  updateChallengeProgressStepError,

  updateChallengeProgressStreakBegin,
  updateChallengeProgressStreakSuccess,
  updateChallengeProgressStreakError,

  getCurrentChallengeBegin,
  getCurrentChallengeSuccess,
  getCurrentChallengeError,

  getChallengesBegin,
  getChallengesSuccess,
  getChallengesError,

  acceptChallengeBegin,
  acceptChallengeSuccess,
  acceptChallengeError,
} from '../reducers/challengeReducer';

import { updateUserImpact } from '../reducers/userReducer';

export const updateChallengeProgressStep = (challengeId, data) => (dispatch) => {
  dispatch(updateChallengeProgressStepBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_CHALLENGE_SUFFIX}${API_CHALLENGE_STEPS_SUFFIX}${challengeId}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify(data),
        });

        const newSteps = await response.json();
        if (newSteps.error) {
          throw (newSteps.error);
        }

        dispatch(updateChallengeProgressStepSuccess(newSteps));
        return newSteps;
      } catch (e) {
        dispatch(updateChallengeProgressStepError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(updateChallengeProgressStepError(error.message));
      return error;
    }
    return user;
  });
};

export const updateChallengeProgressStreak = (challengeId, data) => (dispatch) => {
  dispatch(updateChallengeProgressStreakBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_CHALLENGE_SUFFIX}${API_CHALLENGE_STREAK_SUFFIX}${challengeId}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.error) {
          throw (result.error);
        }

        dispatch(updateChallengeProgressStreakSuccess(result.streak));
        dispatch(updateUserImpact(result.impact));
        return result;
      } catch (e) {
        dispatch(updateChallengeProgressStreakError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(updateChallengeProgressStreakError(error.message));
      return error;
    }
    return user;
  });
};

export const getCurrentChallenge = () => async (dispatch) => {
  dispatch(getCurrentChallengeBegin());

  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_CHALLENGE_SUFFIX}${API_CURRENT_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const result = await response.json();
        if (result.error) {
          throw (result.error);
        }

        return dispatch(getCurrentChallengeSuccess(result));
      } catch (e) {
        dispatch(getCurrentChallengeError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getCurrentChallengeError(error));
      return error;
    }
    return user;
  });
};

export const acceptChallenge = (challengeId, uid) => async (dispatch) => {
  dispatch(acceptChallengeBegin());

  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_CHALLENGE_SUFFIX}${API_CHALLENGE_ACCEPT_SUFFIX}${challengeId}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify({ uid }),
        });

        if (response.ok) {
          return dispatch(acceptChallengeSuccess());
        }
        const result = await response.json();
        if (result.error) {
          throw (result.error);
        }
        return result;
      } catch (e) {
        dispatch(acceptChallengeError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getChallengesError(error));
      return error;
    }
    return user;
  });
};

export const getActiveChallenges = () => async (dispatch) => {
  dispatch(getChallengesBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_CHALLENGE_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const challenges = await response.json();

        if (challenges.error) {
          throw (challenges.error);
        }

        dispatch(getChallengesSuccess(challenges));
        return challenges;
      } catch (e) {
        dispatch(getChallengesError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getChallengesError(error));
      return error;
    }
    return user;
  });
};

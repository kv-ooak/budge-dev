/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChallenges: [],
  currentChallenge: {
    currentUserProgress: {
      streak: [],
      steps: [],
    },
    smallSteps: [],
    steps: [],
    tips: [],
  },
  loading: null,
  error: null,
  accepted: null,
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    skipChallengeProgressStep: (state, action) => {
      const { smallSteps } = state.currentChallenge;
      const currentStep = smallSteps.find((step) => step.id === action.payload);
      const newSmallSteps = smallSteps;
      newSmallSteps.push(
        newSmallSteps.splice(newSmallSteps.indexOf(currentStep), 1)[0],
      );
      state.currentChallenge.smallSteps = newSmallSteps;
    },

    updateChallengeProgressStepBegin: (state) => {
      state.loading = true;
    },

    updateChallengeProgressStepSuccess: (state, action) => ({
      ...state,
      currentChallenge: {
        ...state.currentChallenge,
        currentUserProgress: {
          ...state.currentChallenge.currentUserProgress,
          steps: action.payload,
        },
      },
    }),

    updateChallengeProgressStepError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateChallengeProgressStreakBegin: (state) => {
      state.loading = true;
    },

    updateChallengeProgressStreakSuccess: (state, action) => ({
      ...state,
      currentChallenge: {
        ...state.currentChallenge,
        currentUserProgress: {
          ...state.currentChallenge.currentUserProgress,
          streak: action.payload,
        },
      },
    }),

    updateChallengeProgressStreakError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getCurrentChallengeBegin: (state) => {
      state.loading = true;
    },

    getCurrentChallengeSuccess: (state, action) => ({
      ...state,
      currentChallenge: {
        ...action.payload,
      },
      loading: false,
    }),

    getCurrentChallengeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getChallengesBegin: (state) => {
      state.loading = true;
    },

    getChallengesSuccess: (state, action) => ({
      ...state,
      activeChallenges: action.payload,
      loading: false,
    }),

    getChallengesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    acceptChallengeBegin: (state) => {
      state.loading = true;
    },
    acceptChallengeSuccess: (state) => {
      state.accepted = true;
      state.loading = false;
    },
    acceptChallengeError: (state) => {
      state.loading = false;
      state.error = true;
    },

    resetLoadingState: (state) => {
      state.loading = initialState.loading;
    },

    resetChallengesState: (state) => {
      state.challenges = initialState.challenges;
      state.currentChallenge = initialState.currentChallenge;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
});

export const {
  skipChallengeProgressStep,

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

  resetLoadingState,
  resetChallengesState,

  acceptChallengeBegin,
  acceptChallengeSuccess,
  acceptChallengeError,
} = challengeSlice.actions;

export default challengeSlice.reducer;

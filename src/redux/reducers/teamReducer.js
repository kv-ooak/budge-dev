/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: {
    name: null,
    members: [],
  },
  currentTeam: {
    name: null,
    members: [],
  },
  teams: [],
  loading: null,
  success: null,
  error: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    getCompanyBegin: (state) => {
      state.loading = true;
    },

    getCompanySuccess: (state, action) => {
      state.company = action.payload;
      state.loading = false;
      state.success = true;
    },

    getCompanyError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    resetCompanyState: (state) => {
      state.company = initialState.company;
      state.teams = initialState.team;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
    },

    getCurrentTeamBegin: (state) => {
      state.loading = true;
    },

    getCurrentTeamSuccess: (state, action) => {
      state.currentTeam = action.payload;
      state.loading = false;
      state.success = true;
    },

    getCurrentTeamError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    resetCurrentTeamState: (state) => {
      state.currentTeam = initialState.currentTeam;
      state.teams = initialState.team;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
    },
  },
});

export const {
  getCompanyBegin,
  getCompanySuccess,
  getCompanyError,
  resetCompanyState,

  getCurrentTeamBegin,
  getCurrentTeamSuccess,
  getCurrentTeamError,
  resetCurrentTeamState,
} = teamSlice.actions;

export default teamSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    username: null,
    email: null,
  },
  loading: null,
  error: null,
  success: null,
  verified: null,
  anonymous: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsernameBegin: () => {},

    updateUsernameSuccess: (state, action) => {
      state.data = action.payload;
    },

    updateUsernameError: (state, action) => {
      state.error = action.payload;
    },

    updateUserImpact: (state, action) => {
      const updatedImpact = action.payload;
      state.data.journey[updatedImpact.index] = updatedImpact.value;
    },

    getUserBegin: (state) => {
      state.loading = true;
    },

    getUserSuccess: (state, action) => {
      const { data, verified, anonymous } = action.payload;
      state.data = data;
      state.loading = false;
      state.success = true;
      state.verified = verified;
      state.anonymous = anonymous;
    },

    getUserError: (state, action) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.anonymous = true;
    },

    resetUserState: (state) => {
      state.data = initialState.data;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
    },
  },
});

export const {
  updateUserImpact,
  getUserBegin,
  getUserSuccess,
  getUserError,
  resetUserState,

  updateUsernameBegin,
  updateUsernameSuccess,
  updateUsernameError,
} = userSlice.actions;

export default userSlice.reducer;

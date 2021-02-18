/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: null,
  error: null,
};

const weekSlice = createSlice({
  name: 'week',
  initialState,
  reducers: {
    getWeekBegin: (state) => {
      state.loading = true;
    },

    getWeekSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },

    getWeekError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetWeekState: (state) => {
      state.data = initialState.data;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
});

export const {
  getWeekBegin, getWeekSuccess, getWeekError, resetWeekState,
} = weekSlice.actions;

export default weekSlice.reducer;

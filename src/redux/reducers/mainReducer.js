/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'activity',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateActiveTab: (state, action) => ({
      ...state,
      activeTab: action.payload,
    }),

    resetState: (state) => {
      state.activeTab = initialState.activeTab;
    },
  },
});

export const {
  updateActiveTab,
} = mainSlice.actions;

export default mainSlice.reducer;

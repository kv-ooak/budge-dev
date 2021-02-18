/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: null,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updatePostLikeBegin: () => {},

    updatePostLikeSuccess: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) => {
        if (post._key === updatedPost._key) {
          return updatedPost;
        }
        return post;
      });
      state.loading = false;
      state.success = true;
    },

    updatePostLikeError: (state, action) => {
      state.posts = initialState.posts;
      state.error = action.payload;
    },

    getFeedBegin: (state) => {
      state.loading = true;
    },

    getFeedSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.success = true;
    },

    getFeedError: (state, action) => {
      // state.posts = initialState.posts;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    resetFeedState: (state) => {
      state.posts = initialState.posts;
      state.error = initialState.error;
      state.loading = initialState.loading;
      state.success = initialState.success;
    },
  },
});

export const {
  updatePostLikeBegin,
  updatePostLikeSuccess,
  updatePostLikeError,

  getFeedBegin,
  getFeedSuccess,
  getFeedError,

  resetFeedState,
} = feedSlice.actions;

export default feedSlice.reducer;

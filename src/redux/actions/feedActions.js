import firebase from 'firebase';

import {
  API_URL,
  API_FEED_SUFFIX,
  API_LIKE_SUFFIX,
} from '../../constants/urls';

import {
  updatePostLikeBegin,
  updatePostLikeSuccess,
  updatePostLikeError,

  getFeedBegin,
  getFeedSuccess,
  getFeedError,
} from '../reducers/feedReducer';

export const updatePostLike = (postId) => async (dispatch) => {
  dispatch(updatePostLikeBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_FEED_SUFFIX}${API_LIKE_SUFFIX}${postId}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token,
          },
          body: JSON.stringify({}),
        });

        const result = await response.json();
        if (result.error) {
          throw (result.error);
        }

        dispatch(updatePostLikeSuccess(result));
        return result;
      } catch (e) {
        dispatch(updatePostLikeError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(updatePostLikeError(error));
      return error;
    }
    return user;
  });
};

export const getFeed = () => async (dispatch) => {
  dispatch(getFeedBegin());
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const { currentUser } = firebase.auth();
        const token = await currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}${API_FEED_SUFFIX}`, {
          method: 'GET',
          headers: { token },
        });

        const posts = await response.json();

        if (posts.error) {
          throw (posts.error);
        }

        dispatch(getFeedSuccess(posts));

        return posts;
      } catch (e) {
        dispatch(getFeedError(e.message));
      }
    } else {
      const error = new Error();
      error.status = 409;
      error.message = null;
      dispatch(getFeedError(error));
      return error;
    }
    return user;
  });
};

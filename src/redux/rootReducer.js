import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import weekReducer from './reducers/weekReducer';
import challengeReducer from './reducers/challengeReducer';
import mainReducer from './reducers/mainReducer';
import teamReducer from './reducers/teamReducer';
import feedReducer from './reducers/feedReducer';

const rootReducer = combineReducers({
  userReducer,
  teamReducer,
  weekReducer,
  challengeReducer,
  feedReducer,
  mainReducer,
});

export default rootReducer;

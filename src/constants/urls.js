export const HOST = process.env.REACT_APP_HOST;
export const HOST_PROTOCOL = process.env.REACT_APP_HOST_PROTOCOL;

export const BASE_URL = `${HOST_PROTOCOL}://${HOST}`;

export const API_URL = `${BASE_URL}/api/v1/`;

export const API_USER_SUFFIX = 'users/';
export const API_WEEK_SUFFIX = 'weeks/';
export const API_CHALLENGE_SUFFIX = 'challenges/';
export const API_TEAM_SUFFIX = 'teams/';
export const API_FEED_SUFFIX = 'feed/';
export const API_LIKE_SUFFIX = 'like/';

export const API_CURRENT_SUFFIX = 'current/';
export const API_USERNAME_SUFFIX = 'username/';
export const API_CHALLENGE_ACCEPT_SUFFIX = 'accept/';
export const API_CHALLENGE_STREAK_SUFFIX = 'streak/';
export const API_CHALLENGE_STEPS_SUFFIX = 'steps/';

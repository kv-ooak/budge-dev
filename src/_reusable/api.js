export const HOST = process.env.REACT_APP_HOST;
export const HOST_PROTOCOL = process.env.REACT_APP_HOST_PROTOCOL;

export const BASE_URL = `${HOST_PROTOCOL}://${HOST}`;

export const API_URL = `${BASE_URL}/api/v1/`;

export const API_USER_SUFFIX = 'users/';

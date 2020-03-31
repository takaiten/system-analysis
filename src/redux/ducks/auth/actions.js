import * as types from './types';

export const addUserAction = user => ({
  type: types.ADD_USER,
  payload: user
});

export const logoutAction = () => ({
  type: types.LOGOUT
});

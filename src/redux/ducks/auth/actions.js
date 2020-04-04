import * as types from './types';

export const addUserAction = user => ({
  payload: user,
  type: types.ADD_USER
});

export const loginAction = user => ({
  payload: user,
  type: types.LOGIN
});

export const logoutAction = () => ({
  type: types.LOGOUT
});
